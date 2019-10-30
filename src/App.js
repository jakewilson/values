import React from 'react';
import './App.css';

function Card(props) {
  return (
    <div className="Card">
      <span>{props.value}</span>
    </div>
  );
}

function Deck() {
  return (
    <div className="Deck">
      <Card value="Exploration" />
      <Card value="Accountability" />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div class="App">
        <Deck />
      </div>
    );
  }
}

export default Deck;
