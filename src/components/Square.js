import React from 'react';

export const SquareColor = (() => {
  return {
      VALID: "#32CD03",
      INVALID: "#CD0332",
      SELECTED: "#0332CD",
      OUT_OF_RANGE: "#777777",
  }
})();

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{ backgroundColor: props.color }}
    >
      {props.value}
    </button>
  );
};

export default Square;