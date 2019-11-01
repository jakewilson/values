import React from 'react';
import './App.css';
import './bootstrap.min.css'

function Card(props) {
  return (
    <div className="Card" draggable="true" onDragStart={props.onDragStart}>
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
    card = <Card value={props.topCard} onDragStart={props.onDragStart}/>;
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
    // indices for the `this.state.piles` array
    // the 'top' pile, 'least important' pile, 'important' pile, and 'most important' pile
    this.TOP = 0; this.LI = 1; this.I = 2; this.MI = 3;
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
      activeCard: state.piles[id].shift()
    }));
    console.log('dragging from pile ' + id);
  }

  onDragOver(id, event) {
    event.preventDefault();
  }

  onDrop(id, event) {
    event.preventDefault();
    if (id < 0 || id >= this.state.piles.length) {
      return;
    }

    const piles = this.state.piles;
    piles[id].unshift(this.state.activeCard);

    this.setState((state) => ({
      piles: piles,
      activeCard: null
    }));
    console.log('dropped on pile ' + id + '!');
  }

  render() {
    const piles = this.state.piles.map((pile, index) => {
      return <Pile topCard={pile[0]} placeholder={this.state.placeholderStrings[index]}
                   id={index}
                   onDragStart={this.onDrag.bind(this, index)}
                   onDrop={this.onDrop.bind(this, index)}
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
