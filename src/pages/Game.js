import React, { useState } from 'react';
import uuid from 'react-uuid';

import GameManager from '../GameManager';
import Log from '../Log';
import './Game.css';

import Move from '../skills/Move';

import VictoryScreen from '../components/VictoryScreen';
import FailureScreen from '../components/FailureScreen';
import ObjectiveDisplay from '../components/ObjectiveDisplay';
import LogDisplay from '../components/LogDisplay';
import Board from '../components/Board';
import HintModal from "../components/HintModal";
import { SquareColor } from '../components/Square';

const Game = () => {
  let [hint, setHint] = useState(GameManager.getHint());
  let [squares, setSquares] = useState(Array(GameManager.BOARD_SIZE * GameManager.BOARD_SIZE).fill(SquareColor.OUT_OF_RANGE));
  let [stepNumber, setStepNumber] = useState(1);
  let [selected, setSelected] = useState(null);
  let [selectedSkill, setSelectedSkill] = useState(Move);

  let updateValidity = (origin, predicate, outOfRange) => {
    const squaresCopy = squares.slice();

    for (let i = 0; i < GameManager.BOARD_SIZE * GameManager.BOARD_SIZE; i++) {
      let target = { x: i % GameManager.BOARD_SIZE, y: Math.floor(i / GameManager.BOARD_SIZE) };
      if (origin !== null && origin.getX() === target.x && origin.getY() === target.y) {
        squaresCopy[i] = SquareColor.SELECTED;
      } else if (outOfRange(origin, target)) {
        squaresCopy[i] = SquareColor.OUT_OF_RANGE;
      } else if (predicate(origin, target)) {
        squaresCopy[i] = SquareColor.VALID;
      } else {
        squaresCopy[i] = SquareColor.INVALID;
      }
    }

    setSquares(squaresCopy);
  }

  const handleSelection = (i) => {
    const x = i % GameManager.BOARD_SIZE;
    const y = Math.floor(i / GameManager.BOARD_SIZE);
    const actor = GameManager.getActorAt(x, y);

    if (selected !== null && selected.playerControlled() && selectedSkill !== null) {
      selectedSkill.use(selected, { x: x, y: y });
      updateValidity(selected, selectedSkill.targetIsValid, selectedSkill.outOfRange);
    }

    if (actor !== null) {
      setSelected(actor);
      updateValidity(actor, selectedSkill.targetIsValid, selectedSkill.outOfRange);
    } else {
      setSelected(null);
      updateValidity(null, (a, b) => false, (a, b) => true);
    }

    setSelectedSkill(Move);
  }

  const updateLevel = () => {
    setStepNumber(stepNumber + 1);
    Log.clear();
    Log.log(`Turn ${stepNumber}`);
    GameManager.getAIController().act();
    GameManager.retrieveAllActors().forEach(a => {
      a.updateStatuses();
      a.resetAP();
    });
    GameManager.removeActors(a => a.getHP() <= 0);

    if (selected !== null) {
      if (selected.getHP() <= 0) setSelected(null);
      updateValidity(selected, selectedSkill.targetIsValid, selectedSkill.outOfRange);
    }

    GameManager.getObjectives().forEach((objective) => objective.update());

    if (GameManager.objectivesFailed()) Log.log("Objectives failed!!");
    if (GameManager.objectivesComplete()) Log.log("Objectives complete!!");
  }

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
              if (actor.getAP() >= skill.getAPCost()) {
                setSelectedSkill(skill);
                updateValidity(actor, skill.targetIsValid, skill.outOfRange);
              } else {
                const description = (
                  <article>
                    <p>You can't use the skill <b>{skill.name}</b>.</p>
                    <p><b>{skill.name}</b> requires <b>{skill.getAPCost()}</b> AP, and {actor.getName()} has <b>{actor.getAP()}.</b></p>
                  </article>
                );
                let hint = {
                  title: "Not Enough AP!",
                  description: description,
                };

                setHint(hint);
              }
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
  let modal = null;

  if (selected !== null) status = ActorDisplay(selected);
  if (hint !== null) modal = <HintModal title={hint.title} description={hint.description} setHint={setHint}></HintModal>;
  

  let renderObject = (
    <div className="game">
      <div className="game-board">
        <ObjectiveDisplay />
        <Board
          squares={squares.slice()}
          manager={GameManager}
          onClick={(i) => handleSelection(i)}
        />
      </div>
      <button onClick={() => updateLevel()}>End turn</button>
      <div className="flex-container">
        {status}
        <LogDisplay />
      </div>
      {modal}
    </div>
  );

  if (GameManager.objectivesComplete()) renderObject = <div><VictoryScreen /></div>;
  if (GameManager.objectivesFailed()) renderObject = <div><FailureScreen /></div>;

  return renderObject;
}

export default Game;