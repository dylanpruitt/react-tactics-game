import React from 'react';

const Square = (props) => {
  const renderColor = props.valid ? "#32CD03" : "#CD0332";

  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{ backgroundColor: renderColor }}
    >
      {props.value}
    </button>
  );
};

export default Square;