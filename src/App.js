import React, { useState } from 'react';
import uuid from 'react-uuid';

import GameManager from './GameManager';
import Brute from './actors/Brute';
import Archer from './actors/Archer';
import Move from './skills/Move';
import AIController from './ai/AIController';
import Faction from './actors/Faction';
import NoEnemiesRemain from './Objective';

let player1 = Brute(Math.floor(Math.random() * 7) + 5, 1); player1.setFaction(Faction.PLAYER); player1.setPlayerControlled(true);
let player2 = Brute(Math.floor(Math.random() * 7) + 5, 2); player2.setFaction(Faction.PLAYER); player2.setPlayerControlled(true);
let player3 = Brute(Math.floor(Math.random() * 7) + 5, 3); player3.setFaction(Faction.PLAYER); player3.setPlayerControlled(true);
let player4 = Archer(Math.floor(Math.random() * 7) + 5, 4); player4.setFaction(Faction.PLAYER); player4.setPlayerControlled(true);
let player5 = Archer(Math.floor(Math.random() * 7) + 5, 5); player5.setFaction(Faction.PLAYER); player5.setPlayerControlled(true);
let player6 = Archer(Math.floor(Math.random() * 7) + 5, 0); player6.setFaction(Faction.PLAYER); player6.setPlayerControlled(true);
GameManager.addActors([player1, player2, player3, player4, player5, player6]);
GameManager.addActors([
  Brute(6, 10),
  Brute(10, 10),
  Archer(3, 10),
  Archer(16, 10),
  Brute(15, 10),
  Brute(14, 10),
]);
GameManager.addObjective(NoEnemiesRemain);

let friendlyAI = AIController(Faction.FRIENDLY);
let enemyAI = AIController(Faction.ENEMY);

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

  const ObjectiveDisplay = () => {
    let objectives = GameManager.getObjectives().map((objective) => {
      const message = (<section key={uuid()}>
        <p>{`${objective.getName()} - ${objective.getDescription()} (${objective.getProgressMessage()}).`}</p>
      </section>);

      if (objective.complete()) {
        return <del key={uuid()}>{message}</del>;
      } else {
        return message;
      }
        
    });
    return (
      <div>
        <h1>Objectives</h1>
        {objectives}
      </div>
    );
  }

  let status = null;

  if (selected !== null) status = ActorDisplay(selected);

  return (
    <div className="game">
      <div className="game-board">
        {ObjectiveDisplay()}
        <Board
          squares={current.squares}
          manager={manager}
          onClick={(i) => {
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
          }
        />
      </div>
      <button onClick={() => {
        setHistory(history.concat([{
          squares: squares
        }]));
        setStepNumber(history.length);
        console.log(`Turn ${stepNumber}`);
        friendlyAI.act();
        enemyAI.act();
        GameManager.retrieveAllActors().forEach(a => a.resetAP());
        GameManager.removeActors(a => a.getHP() <= 0);

        if (selected !== null) {
          if (selected.getHP() <= 0) setSelected(null);
          updateValidity(selected, selectedSkill.targetIsValid);
        }

        if (GameManager.objectivesFailed()) console.log("%cObjectives failed!!", "color:red");
        if (GameManager.objectivesComplete()) console.log("%cObjectives complete!!", "color:green");

      }}>End turn</button>
      {status}
    </div>
  );
}

export default Game;
