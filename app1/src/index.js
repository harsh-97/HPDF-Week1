import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props){
  return (
    <button className="square" onClick = {props.onClick}>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.grid[i]} 
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
  constructor(props){
    super(props);
    this.state = {
      history: [{
        grid: Array(9).fill(null),
      }],
      xIsNext: true,
      gameState: 0,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.gameState + 1);
    const current = history[history.length - 1];
    const grid = current.grid.slice();

    if (calculateWinner(grid) || grid[i]){
      return;
    }
    grid[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        grid: grid,
      }]), 
      xIsNext: !this.state.xIsNext,
      gameState: history.length,
    });
  }

  jumpTo(goToGameState){
    this.setState({
      gameState: goToGameState,
      xIsNext: goToGameState%2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.gameState];
    const winner = calculateWinner(current.grid);
    
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
    if(winner){
      status = 'Winner is ' + winner;
    }  else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            grid={current.grid}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(grid) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  return null;
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
