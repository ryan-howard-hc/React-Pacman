import React from 'react';
import Pac from './00pac.js';

const GamePage = () => {
  // boardData is a 2D array representing the game board
  const boardData = [
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', '.', 'X', '.', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', 'U', 'X', '.', '.', 'X', '.', 'X', '.', '.', '.', 'X', '.', 'X', '.', 'X', '.', '.', '.', 'X', '.', 'X', '.', '.', 'X', 'U', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', '.', 'X', '.', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', 'X', 'X', '.', '.', '.', 'X', 'X', 'X', '.', '.', '.', 'X', 'X', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', '.', '.', '.', '.', '.', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'G', 'G', '.', 'G', 'G', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', '.', '.', '.', '.', '.', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', '.', '.', '.', '.', '.', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'X', '.', 'X', 'X', '.', '.', '.', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'X', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', 'U', '.', '.', 'X', 'X', '.', '.', '.', '.', '.', '.', '.', 'P', '.', '.', '.', '.', '.', '.', '.', 'X', 'X', '.', '.', 'U', 'X'],
    ['X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X'],
    ['X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', '.', 'X', 'X', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', 'X', 'X', '.', '.', '.', 'X', 'X', 'X', '.', '.', '.', 'X', 'X', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'X'],
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],

  ]

  return (
    <div className="game-container">
      <h1>Pac-Man Game</h1>
      <Pac boardData={boardData} />
    </div>
  );
};

export default GamePage;