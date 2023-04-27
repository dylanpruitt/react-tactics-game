import React from 'react';
import Faction from '../actors/Faction';

export const SquareColor = (() => {
  return {
    VALID: "#32CD03",
    INVALID: "#CD0332",
    SELECTED: "#0296CC",
    OUT_OF_RANGE: "#DDDDDD",
    HIGHLIGHT: "#EEEE00"
  }
})();

const Square = (props) => {
  let factionColor = null;

  if (props.factionValue === Faction.ENEMY) {
    factionColor = "red";
  } else if (props.factionValue === Faction.FRIENDLY) {
    factionColor = "blue";
  } else if (props.factionValue === Faction.PLAYER) {
    factionColor = "green";
  }

  const enemyText = factionColor ? (<div className="faction-icon" style={{ backgroundColor: factionColor }}></div>) : null;
  if (props.enemyAtTile) console.log(enemyText);
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{ backgroundColor: props.color }}
    >
      {props.value}
      {enemyText}
    </button>
  );
};

export default Square;