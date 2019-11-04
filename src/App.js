import React from 'react';
import './App.css';
import './bootstrap.min.css'

function Card(props) {
  return (
    <div className="Card" draggable="true" onDragStart={props.onDragStart} onDragEnd={props.onDragEnd}>
      <span>{props.value}</span>
    </div>
  );
}

function CardPlaceholder(props) {
  return (
    <div className="CardPlaceholder">
      Empty
    </div>
  );
}

function Pile(props) {
  let card = <CardPlaceholder name={props.name}/>;
  if (props.topCard) {
    card = <Card value={props.topCard} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd}/>;
  }

  return (
    <div onDrop={props.onDrop} className="Pile" onDragOver={props.onDragOver}>
      <span>{props.name}</span>
      {card}
    </div>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.TOP_PILE = 0; this.LI_PILE = 1; this.I_PILE = 2; this.MI_PILE = 3;
    this.state = {
      piles: [
        this.getCards(),
        [], [], []
      ],
      pileNames: [
        "Values",
        "Least Important",
        "Important",
        "Most Important"
      ],
      activeCard: null // the card currently being dragged
    }
  }

  getCards() {
    return [
      'Love',
      'Health',
      'Wealth',
      'Comfort',
      'Fun',
      'Happiness',
      'Success',
      'Learning',
      'Peace',
      'Intimacy',
      'Adventure',
      'Security'
    ]
  }

  onDrag(id, event) {
    if (id < 0 || id >= this.state.piles.length) {
      return;
    }

    this.setState((state) => ({
      activeCard: state.piles[id][0]
    }));
  }

  onDragOver(id, event) {
    // this is needed to drop the element
    event.preventDefault();
  }

  onDrop(id, event) {
    event.preventDefault();
    if (id < 0 || id >= this.state.piles.length) {
      return;
    }

    const piles = this.state.piles.slice();
    piles[id].unshift(this.state.activeCard);

    this.setState({
      piles: piles
    });
  }

  onDragEnd(id, event) {
    if (id < 0 || id >= this.state.piles.length) {
      return;
    }

    const piles = this.state.piles.slice();

    // a dropEffect of 'none' means the item was not dropped on a valid drop zone
    if (event.nativeEvent.dataTransfer.dropEffect !== 'none') {
      // if this was a valid drop, remove the dropped card from the original pile
      piles[id].shift();
    }

    this.setState({
      piles: piles,
      activeCard: null
    });

    if (piles[this.TOP_PILE].length === 0) {
      this.newRound();
    }
  }

  newRound() {
    // TODO
    // maybe alert the user that the everything not in the 'most important' pile
    // will be thrown away
    const pileToSave = this.state.piles[this.MI_PILE].slice();

    if (pileToSave.length >= 3) {
      this.setState((state) => {
        state.piles = state.piles.map((pile) => []);
        state.piles[this.TOP_PILE] = pileToSave;
      });
    }
  }

  render() {
    const piles = this.state.piles.map((pile, index) => {
      return <Pile topCard={pile[0]} name={this.state.pileNames[index]}
                   onDragStart={this.onDrag.bind(this, index)}
                   onDrop={this.onDrop.bind(this, index)}
                   onDragEnd={this.onDragEnd.bind(this, index)}
                   onDragOver={this.onDragOver.bind(this, index)}/>
    });

    return (
      <div className="App">
        <div className="row">
          {piles[0]}
        </div>
        <div className="row">
          {piles.slice(1)}
        </div>
      </div>
    );
  }
}

export default App;
