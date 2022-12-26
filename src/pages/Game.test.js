import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  const game = <Game />;
  root.render(game);
});