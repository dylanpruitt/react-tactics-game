import React, { useState } from 'react';
import uuid from 'react-uuid';

import GameManager from './GameManager';
import Log from './Log';
import Brute from './actors/Brute';
import Horseman from './actors/Horseman';
import Archer from './actors/Archer';
import Mortar from './actors/Mortar';
import Cleric from './actors/Cleric';

import Move from './skills/Move';
import AIController from './ai/AIController';
import Faction from './actors/Faction';
import NoEnemiesRemain from './Objective';

import VictoryScreen from './components/VictoryScreen';
import FailureScreen from './components/FailureScreen';
import ObjectiveDisplay from './components/ObjectiveDisplay';
import LogDisplay from './components/LogDisplay';

for (let i = 0; i < 10; i++) {
  let x = Math.floor(Math.random() * 100) + 1;
  let actor = null;
  if (x < 50) {
    actor = Brute(i, 0);
  } else if (x < 75) {
    actor = Archer(i, 0);
  } else if (x < 90) {
    actor = Horseman(i, 0);
  } else {
    actor = Mortar(i, 0);
  }

  GameManager.addActor(actor);
}

for (let i = 0; i < 3; i++) {
  let x = Math.floor(Math.random() * 100) + 1;
  let actor = Archer(i + 7, 9); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
  GameManager.addActor(actor);

  actor = Archer(i + 7, 10); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
  GameManager.addActor(actor);
}

let john = Mortar(5,11); john.setFaction(Faction.PLAYER); john.setPlayerControlled(true);
GameManager.addActor(john);
let ac = Horseman(5,7); ac.setFaction(Faction.PLAYER); ac.setPlayerControlled(true);
GameManager.addActor(ac);

GameManager.addObjective(NoEnemiesRemain);

let enemyAI = AIController(Faction.ENEMY);

const BOARD_SIZE = 15;

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
        let value = actorAtTile ? "G" : "";
        if (actorAtTile && props.manager.getActorAt(r, row).getFaction() === Faction.ENEMY) value = "E";
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
  let [stepNumber, setStepNumber] = useState(0);
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

    squares.map((square, i) => { return predicate(origin, { x: i % BOARD_SIZE, y: Math.floor(i / BOARD_SIZE) }) });

    setHistory(historyCopy.concat([{
      squares: squares
    }]));
    setStepNumber(history.length);
  }

  const handleSelection = (i) => {
    const x = i % BOARD_SIZE;
    const y = Math.floor(i / BOARD_SIZE);
    const actor = GameManager.getActorAt(x, y);

    if (selected !== null && selected.playerControlled() && selectedSkill !== null) {
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

  const updateLevel = () => {
    setHistory(history.concat([{
      squares: squares
    }]));
    setStepNumber(history.length);
    Log.clear();
    Log.log(`Turn ${stepNumber}`);
    enemyAI.act();
    GameManager.retrieveAllActors().forEach(a => a.resetAP());
    GameManager.removeActors(a => a.getHP() <= 0);

    if (selected !== null) {
      if (selected.getHP() <= 0) setSelected(null);
      updateValidity(selected, selectedSkill.targetIsValid);
    }

    if (GameManager.objectivesFailed()) Log.log("Objectives failed!!");
    if (GameManager.objectivesComplete()) Log.log("Objectives complete!!");
  }

  const current = history[stepNumber];
  const squares = current.squares.slice();

  const ActorDisplay = (actor) => {
    let skillDisplay = null;

    if (actor !== null && actor.playerControlled()) {
      skillDisplay = actor.getSkills().map((skill) => {
        return <button
          disabled={skill === selectedSkill}
          key={uuid()}
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
        <p>{`${actor.getHP()}/${actor.getMaxHP()} HP`}</p>
        <p>{`${actor.getAP()}/${actor.getMaxAP()} AP`}</p>
        {skillDisplay}
      </div>
    );
  }

  let status = null;

  if (selected !== null) status = ActorDisplay(selected);

  let renderObject = (
    <div className="game">
      <div className="game-board">
        <ObjectiveDisplay />
        <Board
          squares={current.squares}
          manager={manager}
          onClick={(i) => handleSelection(i)}
        />
      </div>
      <button onClick={() => updateLevel()}>End turn</button>
      <div className="flex-container">
        {status}
        <LogDisplay />
      </div>
    </div>
  );

  if (GameManager.objectivesComplete()) renderObject = <div><VictoryScreen /></div>;
  if (GameManager.objectivesFailed()) renderObject = <div><FailureScreen /></div>;
  
  return renderObject;
}

export default Game;