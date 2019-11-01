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

function Pile(props) {
  if (!props.topCard) {
    return (
      <CardPlaceholder name={props.placeholder}/>
    );
  }

  return (
    <Card value={props.topCard}/>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topPile: this.getCards(),
      // the 'least important' pile
      liPile: [],
      // the 'important pile'
      iPile: [],
      // the 'most important' pile
      miPile: []
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

  render() {
    return (
      <div class="App">
        <div class="row">
          <Pile topCard={this.state.topPile[0]} placeholder="Empty"/>
        </div>
        <div class="row">
          <Pile topCard={this.state.liPile[0]} placeholder="Least Important"/>
          <Pile topCard={this.state.iPile[0]} placeholder="Important"/>
          <Pile topCard={this.state.miPile[0]} placeholder="Most Important"/>
        </div>
      </div>
    );
  }
}

export default App;
