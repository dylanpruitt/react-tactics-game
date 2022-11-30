import React, { useState } from 'react';
import GameManager from './GameManager';
import Actor from './actors/Actor';
import Move from './skills/Move';
import Attack from './skills/Attack';

let rayMone = Actor("Ray", 5, 5); rayMone.addSkill(Attack);
GameManager.addActor(rayMone);
GameManager.addActor(Actor("Jon", 8, 8));

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

const Game = (props) => {
  let [manager, setManager] = useState(GameManager);
  let [history, setHistory] = useState([{
    squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
  }]);
  let [stepNumber, setStepNumber] = useState([0]);
  let [selected, setSelected] = useState(null);
  let [selectedSkill, setSelectedSkill] = useState(Move);

  let jumpTo = (step) => {
    setStepNumber(step);
  }

  let updateValidity = (origin, predicate) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = history[stepNumber];
    const squares = current.squares.slice();

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      squares[i] = predicate(origin, { x: i % BOARD_SIZE, y: Math.floor(i / BOARD_SIZE) });
    }

    squares.map((square, i) => { square = predicate(origin, { x: i % BOARD_SIZE, y: Math.floor(i / BOARD_SIZE) }) });

    setHistory(historyCopy.concat([{
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

  const ActorDisplay = (actor) => {
    let skillDisplay = null;

    if (actor !== null) {
      skillDisplay = actor.getSkills().map((skill) => {
        return <button
          disabled={skill === selectedSkill}
          key={skill.name}
          onClick={() => {
            setSelectedSkill(skill);
            updateValidity(actor, skill.targetIsValid);
          }
          }>{skill.name}</button>
      });
    }

    return (
      <div>
        <h1>{`${actor.getName()} (${actor.getX()}, ${actor.getY()})`}</h1>
        <p>{`${actor.getHP()} HP`}</p>
        {skillDisplay}
      </div>
    );
  }

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

            if (selected !== null && selectedSkill !== null) {
              selectedSkill.use(selected, { x: x, y: y });
              updateValidity(selected, selectedSkill.targetIsValid);
            }

            if (actor !== null) {
              setSelected(actor);
              updateValidity(actor, selectedSkill.targetIsValid);
            } else {
              setSelected(null);
              updateValidity(null, (a, b) => false);
            }

            setSelectedSkill(Move);
          }
          }
        />
      </div>
      <button onClick={() => {
        let z = manager.retrieveAllActors()[0];
        Move.use(z, { x: z.x + 1, y: z.y });

        setHistory(history.concat([{
          squares: squares
        }]));
        setStepNumber(history.length);
      }}>Dude</button>
      {status}
    </div>
  );
}

export default Game;
