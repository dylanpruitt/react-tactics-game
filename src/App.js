import React from 'react';
import GameManager from './GameManager';

GameManager.addActor({name:"Raymond",x:5,y:5});
GameManager.addActor({name:"Jon",x:6,y:5});

let testSkill = {
  use: (user, target) => {
    console.log(`${user.name} attacks ${target.name}!`);
    target.x++;
  }
};

let x = GameManager.retrieveActors((a) => true);
testSkill.use(x[0],x[1])

function Square(props) {
  const renderColor = props.valid ? "#32CD03" : "#CD0332";

  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={
        { backgroundColor: renderColor }
      }
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  const rows = Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const boardRows = rows.map((row) => {
    return (<div className="board-row" key={row}>
      {rows.map((r) => {
        const actorAtTile = GameManager.getActorAt(r,row) !== null;
        const value = actorAtTile ? "G" : "";
        return (
          <Square
            key={10 * row + r}
            value={value}
            valid={props.squares[10 * row + r]}
            onClick={() => props.onClick(10 * row + r)}
          />
        )
      })}

    </div>);
  });
  return (
    <div className="board">
      {boardRows}
    </div>
  );
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(100).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    squares[i] = !squares[i];
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

  updateValidity(origin, predicate) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    for (let i = 0; i < 100; i++) {
      squares[i] = predicate(origin, i);
    }

    squares.map((square, i) => { square = predicate(origin, i) });

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
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

    let status = "";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              console.log(GameManager.getActorAt(x,y));
            }
            }
          />
        </div>
        <div className="game-info">
          <div>Bruh</div>
          <ol>{moves}</ol>
        </div>
        <button onClick={() => {
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);
          GameManager.actors[0].x = x;
          GameManager.actors[0].y = y;
          console.log(GameManager.actors[0]);
        }}>gsg</button>
      </div>
    );
  }
}

export default Game;
