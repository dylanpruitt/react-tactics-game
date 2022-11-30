import React, { useState } from 'react';
import GameManager from './GameManager';

GameManager.addActor({ name: "Raymond", x: 5, y: 5 });
GameManager.addActor({ name: "Jon", x: 6, y: 5 });

const BOARD_SIZE = 20;

const Square = (props) => {
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

const Board = (props) => {
  const range = (x, y) => // taken from https://stackoverflow.com/questions/37568712/making-a-range-function-in-javascript
    x > y ? [] : [x, ...range(x + 1, y)];
  const rows = range(0, BOARD_SIZE - 1);
  const boardRows = rows.map((row) => {
    return (<div className="board-row" key={row}>
      {rows.map((r) => {
        const actorAtTile = props.manager.getActorAt(r, row) !== null;
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

const ActorDisplay = (actor) => {
  return (
    <div>
      <h1>{`${actor.name} (${actor.x}, ${actor.y})`}</h1>
      <p>{`${actor.hp} HP`}</p>
    </div>
  );
}

const Game = (props) => {
  let [manager, setManager] = useState(GameManager);
  let [history, setHistory] = useState([{
    squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
  }]);
  let [stepNumber, setStepNumber] = useState([0]);
  let [selected, setSelected] = useState(null);

  let jumpTo = (step) => {
    setStepNumber(step);
  }

  let updateValidity = (origin, predicate) => {
    const history = history.slice(0, stepNumber + 1);
    const current = history[stepNumber];
    const squares = current.squares.slice();

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      squares[i] = predicate(origin, i);
    }

    squares.map((square, i) => { square = predicate(origin, i) });

    setHistory(history.concat([{
      squares: squares
    }]));
    setStepNumber(history.length);
  }

  const current = history[stepNumber];
  const squares = current.squares.slice();
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status = null;

  if (selected !== null) status = ActorDisplay(selected);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          manager={manager}
          onClick={(i) => {
            const x = i % BOARD_SIZE;
            const y = Math.floor(i / BOARD_SIZE);
            const actor = GameManager.getActorAt(x, y);
            console.log(actor);
            if (actor !== null) 
              setSelected(actor); 
            else
              setSelected(null);
          }
          }
        />
      </div>
      <div className="game-info">
        <div>Bruh</div>
        <ol>{moves}</ol>
      </div>
      {status}
      <button onClick={() => {
        let x = Math.floor(Math.random() * BOARD_SIZE);
        let y = Math.floor(Math.random() * BOARD_SIZE);

        let z = manager.retrieveAllActors()[0];
        z.x = x;
        z.y = y;
        console.log(manager.retrieveAllActors());

        setHistory(history.concat([{
          squares: squares
        }]));
        setStepNumber(history.length);
      }}>Dude</button>
    </div>
  );
}

export default Game;
