import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function OpponentHand(props) {
  return (
    <div className="opponent-hand">
      {props.value}
    </div>
  );
}

function PlayerHand(props) {
  return (
    <button
      className="player-hand"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Page extends React.Component {
  renderPlayerHand(hand) {
    return <PlayerHand
            value={hand}
            onClick={() => this.props.onClick(hand)}
          />
  }

  render() {
    return (
      <div className="app">
        <OpponentHand value={this.props.opponentHand}/>
        <div className="message">
          {calculateWinner(this.props.playerHand, this.props.opponentHand)}
        </div>
        <div className="player-hand">
          {this.renderPlayerHand("✊")}
          {this.renderPlayerHand("✌️")}
          {this.renderPlayerHand("✋")}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: "",
      opponentHand: "✊",
    };
    this.setPlayerHand = this.setPlayerHand.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount() {
    this.setTimer()
  }

  setTimer() {
    this.timerID = setInterval(
      () => this.changeOpponentHand(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  changeOpponentHand() {
    if (this.state.playerHand) { return; }

    if (this.state.opponentHand === '✊') {
      this.setState({
        opponentHand: "✌️"
      });
    } else if (this.state.opponentHand === "✌️") {
      this.setState({
        opponentHand: "✋"
      });
    } else if (this.state.opponentHand === "✋") {
      this.setState({
        opponentHand: "✊"
      });
    }
  }

  setPlayerHand(hand) {
    clearInterval(this.timerID);
    this.setState({ playerHand: hand });
  }

  startNewGame() {
    this.setTimer()
    this.setState({ playerHand: "" });
  }

  render() {
    const playerHand = this.state.playerHand;
    const opponentHand = this.state.opponentHand;
    const page = <Page 
                  playerHand={playerHand}  
                  opponentHand={opponentHand}
                  onClick={(hand) => this.setPlayerHand(hand)}
                />
    if(playerHand) {
      return (
        <div className="app" onClick={this.startNewGame}>
          {page}
        </div>
      );
    } else {
      return (
        <div className="app">
          {page}
        </div>
      );
    }
  }
}

function calculateWinner(playerHand, opponentHand) {
  if(playerHand === opponentHand) {
    return "引き分け！"
  } else if((playerHand === "✊" && opponentHand === "✌️") ||
            (playerHand === "✌️" && opponentHand === "✋") ||
            (playerHand === "✋" && opponentHand === "✊")) {
    return "You Win!"
  } else if((playerHand === "✊" && opponentHand === "✋") ||
            (playerHand === "✌️" && opponentHand === "✊") ||
            (playerHand === "✋" && opponentHand === "✌️")) {
    return "You Lose..."
  }
  return "勝負！";
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);