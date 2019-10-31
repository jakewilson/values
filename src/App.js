import React from 'react';
import './App.css';
import './bootstrap.min.css'

function Card(props) {
  return (
    <div className="Card" draggable="true">
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

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards
    }
  }

  componentDidMount() {

  }

  render() {
    let card = <CardPlaceholder name="Empty Deck"/>;
    if (this.state.cards && this.state.cards.length > 0) {
      card = <Card value={this.state.cards[0]}/>;
    }
    return (
      <div className="Deck">
        {card}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div class="App">
        <div class="row">
          <Deck cards={getCards()}/>
        </div>
        <div class="row">
          <Deck />
          <Deck />
          <Deck />
        </div>
      </div>
    );
  }
}

function getCards() {
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

export default App;
