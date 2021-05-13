import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
function Square(props) {
    return (
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
*/

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
    this.clearPlayerHand = this.clearPlayerHand.bind(this);
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
    if (this.state.playerHand) { 
      clearInterval(this.timerID); 
    }

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
    console.log(hand);
    this.setState({ playerHand: hand });
  }

  clearPlayerHand() {
    this.setState({ playerHand: "" });
  }

  render() {
    const playerHand = this.state.playerHand;
    const opponentHand = this.state.opponentHand;
    if(playerHand) {
      return (
        <div className="app" onClick={this.clearPlayerHand}>
          <Page 
            playerHand={playerHand}  
            opponentHand={opponentHand}
            onClick={(hand) => this.setPlayerHand(hand)}
          />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Page 
            playerHand={playerHand}  
            opponentHand={opponentHand}
            onClick={(hand) => this.setPlayerHand(hand)}
          />
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