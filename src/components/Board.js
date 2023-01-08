import React from 'react';
import GameManager from '../GameManager';
import Square from './Square';

const Board = (props) => {
  const range = (x, y) => // taken from https://stackoverflow.com/questions/37568712/making-a-range-function-in-javascript
    x > y ? [] : [x, ...range(x + 1, y)];
  const rows = range(0, GameManager.BOARD_SIZE - 1);
  const boardRows = rows.map((row) => {
    return (<div className="board-row" key={row}>
      {rows.map((r) => {
        const actorAtTile = props.manager.getActorAt(r, row);
        let value = actorAtTile !== null ? actorAtTile.getImage() : "";
        let factionValue = actorAtTile !== null ? actorAtTile.getFaction() : "";

        return (
          <Square
            key={GameManager.BOARD_SIZE * row + r}
            value={value}
            factionValue={factionValue}
            color={props.squares[GameManager.BOARD_SIZE * row + r]}
            onClick={() => props.onClick(GameManager.BOARD_SIZE * row + r)} />
        );
      })}

    </div>);
  });
  return (
    <div className="board">
      {boardRows}
    </div>
  );
};

export default Board;