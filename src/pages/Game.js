import React, { useState } from 'react';
import uuid from 'react-uuid';

import GameManager from '../GameManager';
import Log from '../Log';
import './Game.css';

import Move from '../skills/Move';
import AIController from '../ai/AIController';
import Faction from '../actors/Faction';

import VictoryScreen from '../components/VictoryScreen';
import FailureScreen from '../components/FailureScreen';
import ObjectiveDisplay from '../components/ObjectiveDisplay';
import LogDisplay from '../components/LogDisplay';
import Board from '../components/Board';

let enemyAI = AIController(Faction.ENEMY);

const Game = () => {
  let [history, setHistory] = useState([{
    squares: Array(GameManager.BOARD_SIZE * GameManager.BOARD_SIZE).fill(null),
  }]);
  let [stepNumber, setStepNumber] = useState(0);
  let [selected, setSelected] = useState(null);
  let [selectedSkill, setSelectedSkill] = useState(Move);

  let updateValidity = (origin, predicate) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = history[stepNumber];
    const squares = current.squares.slice();

    for (let i = 0; i < GameManager.BOARD_SIZE * GameManager.BOARD_SIZE; i++) {
      squares[i] = predicate(origin, { x: i % GameManager.BOARD_SIZE, y: Math.floor(i / GameManager.BOARD_SIZE) });
    }

    squares.map((square, i) => { return predicate(origin, { x: i % GameManager.BOARD_SIZE, y: Math.floor(i / GameManager.BOARD_SIZE) }) });

    setHistory(historyCopy.concat([{
      squares: squares
    }]));
    setStepNumber(history.length);
  }

  const handleSelection = (i) => {
    const x = i % GameManager.BOARD_SIZE;
    const y = Math.floor(i / GameManager.BOARD_SIZE);
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
    GameManager.retrieveAllActors().forEach(a => {
      a.updateStatuses();
      a.resetAP();
    });
    GameManager.removeActors(a => a.getHP() <= 0);

    if (selected !== null) {
      if (selected.getHP() <= 0) setSelected(null);
      updateValidity(selected, selectedSkill.targetIsValid);
    }

    GameManager.getObjectives().forEach((objective) => objective.update());

    if (GameManager.objectivesFailed()) Log.log("Objectives failed!!");
    if (GameManager.objectivesComplete()) Log.log("Objectives complete!!");
  }

  const current = history[stepNumber];
  const squares = current.squares.slice();

  const ActorDisplay = (actor) => {
    let skillDisplay = null;
    let statusDisplay = null;

    if (actor !== null) {
      if (actor.playerControlled()) {
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

      statusDisplay = actor.getStatuses().map((status) => {
        return <p key={uuid()}>
          {`${status.getName()}: ${status.getDescription()}`}
        </p>;
      })
    }

    return (
      <div>
        <h1>{`${actor.getName()} (${actor.getX()}, ${actor.getY()})`}</h1>
        <p>{`${actor.getHP()}/${actor.getMaxHP()} HP`}</p>
        <p>{`${actor.getAP()}/${actor.getMaxAP()} AP`}</p>
        <h2>Statuses:</h2>
        {statusDisplay}
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
          manager={GameManager}
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