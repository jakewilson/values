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
      {props.name}
    </div>
  );
}

function Pile(props) {
  let card = <CardPlaceholder name={props.placeholder}/>;
  if (props.topCard) {
    card = <Card value={props.topCard} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd}/>;
  }

  return (
    <div onDrop={props.onDrop} className="Pile" onDragOver={props.onDragOver}>
      {card}
    </div>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      piles: [
        this.getCards(),
        [], [], []
      ],
      placeholderStrings: [
        "Empty",
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

    console.log('dragging from pile ' + id);
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

    const piles = this.state.piles;
    piles[id].unshift(this.state.activeCard);

    this.setState({
      piles: piles
    });

    console.log('dropped on pile ' + id + '!');
  }

  onDragEnd(id, event) {
    if (id < 0 || id >= this.state.piles.length) {
      return;
    }

    const piles = this.state.piles;

    // a dropEffect of 'none' means the item was not dropped on a valid drop zone
    if (event.nativeEvent.dataTransfer.dropEffect !== 'none') {
      // if this was a valid drop, remove the dropped card from the original pile
      piles[id].shift();
    }

    this.setState({
      piles: piles,
      activeCard: null
    });

    console.log(id + ' drag end');
  }

  render() {
    const piles = this.state.piles.map((pile, index) => {
      return <Pile topCard={pile[0]} placeholder={this.state.placeholderStrings[index]}
                   id={index}
                   onDragStart={this.onDrag.bind(this, index)}
                   onDrop={this.onDrop.bind(this, index)}
                   onDragEnd={this.onDragEnd.bind(this, index)}
                   onDragOver={this.onDragOver.bind(this, index)}/>
    });

    return (
      <div className="App">
        <div className="row">
          {piles.shift()}
        </div>
        <div className="row">
          {piles}
        </div>
      </div>
    );
  }
}

export default App;
