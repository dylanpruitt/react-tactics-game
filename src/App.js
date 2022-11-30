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

let BOARD_SIZE = 20;

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
  const range = (x,y) => // taken from https://stackoverflow.com/questions/37568712/making-a-range-function-in-javascript
    x > y ? [] : [x, ...range(x + 1, y)];
  const rows = range(0, BOARD_SIZE-1);
  const boardRows = rows.map((row) => {
    return (<div className="board-row" key={row}>
      {rows.map((r) => {
        const actorAtTile = props.manager.getActorAt(r,row) !== null;
        const value = actorAtTile ? "G" : "";
        return (
          <Square
            key={BOARD_SIZE * row + r}
            value={value}
            valid={props.squares[BOARD_SIZE * row + r]}
            onClick={() => props.onClick(BOARD_SIZE * row + r)}
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
        squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
      }],
      stepNumber: 0,
      manager: GameManager,
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
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  updateValidity(origin, predicate) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      squares[i] = predicate(origin, i);
    }

    squares.map((square, i) => { square = predicate(origin, i) });

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
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
            manager={this.state.manager}
            onClick={(i) => {
              const x = i % BOARD_SIZE;
              const y = Math.floor(i / BOARD_SIZE);
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
          let x = Math.floor(Math.random() * BOARD_SIZE);
          let y = Math.floor(Math.random() * BOARD_SIZE);

          let z = this.state.manager.retrieveActors((a) => true)[0];
          z.x = x;
          z.y = y;
          console.log(this.state.manager.retrieveActors((a) => true));

          this.setState(
            {manager: this.state.manager}
          );
        }}>gsg</button>
      </div>
    );
  }
}

export default Game;
