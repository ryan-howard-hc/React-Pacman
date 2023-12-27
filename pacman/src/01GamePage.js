import React, { useState, useEffect } from 'react';
import Pac from './00pac.js';
import PacMan from './02PacMan.js';
import Blinky from './03Blinky.js';

const GamePage = () => {
  // boardData is a 2D array representing the game board
  const initialBoardData  = [
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
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'G1', 'G2', '.', 'G3', 'G4', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
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
  const [boardData, setBoardData] = useState(initialBoardData);
  const [pacmanPosition, setPacmanPosition] = useState({ row: 23, col: 13 });
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [visitedSquares, setVisitedSquares] = useState(new Set());

  const handleKeyPress = () => {
    // Update key press count
    setKeyPressCount(prevCount => prevCount + 1);
    
  };

  

  return (
    <div className="game-container">
      <h1>Pac-Man Game</h1>
      <p>Key Press Count: {keyPressCount}</p>
      <Pac boardData={boardData} />

      <PacMan
        initialBoardData={initialBoardData}
        boardData={boardData}
        pacmanPosition={pacmanPosition}
        setPacmanPosition={setPacmanPosition}
        setBoardData={setBoardData}
        handleKeyPress={handleKeyPress}

      />
      <Blinky
        boardData={boardData}
        initialBoardData={initialBoardData}
        pacmanPosition={pacmanPosition}
        keyPressCount={keyPressCount}

      />
    </div>
  );
};

export default GamePage;