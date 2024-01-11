import React, { useState, useEffect } from 'react';
import Pac from './00pac.js';
import PacMan from './02PacMan.js';
import Blinky from './03Blinky.js';
import Pinky from './04Pinky.js';
const GamePage = () => {
  // boardData is a 2D array representing the game board
  const initialBoardData  = [
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'U', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'U', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'C', 'C', 'C', 'X', 'X', 'X', 'C', 'C', 'C', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', '.', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', '.', '.', '.', '.', '.', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'G1', 'G2', '.', 'G3', 'G4', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', '.', '.', '.', '.', '.', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', '.', '.', '.', '.', '.', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'U', 'C', 'C', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'P', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'C', 'C', 'U', 'X'],
    ['X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'C', 'X', 'X', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'X', 'X', 'C', 'C', 'C', 'X', 'X', 'X', 'C', 'C', 'C', 'X', 'X', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'C', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'C', 'X'],
    ['X', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],

  ]
  const [boardData, setBoardData] = useState(initialBoardData);
  const [pacmanPosition, setPacmanPosition] = useState({ row: 23, col: 13 });
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [collectedCoins, setCollectedCoins] = useState(0);

  const handleKeyPress = () => {
    // Update key press count
    setKeyPressCount(prevCount => prevCount + 1);
    
  };

  

  return (
    <div className="game-container">
      <h1>Pac-Man Game</h1>
      <p>Key Press Count: {keyPressCount}</p>
      <p>Points: {collectedCoins}</p>
      <Pac boardData={boardData} />

      <PacMan
        initialBoardData={initialBoardData}
        boardData={boardData}
        pacmanPosition={pacmanPosition}
        setPacmanPosition={setPacmanPosition}
        setBoardData={setBoardData}
        handleKeyPress={handleKeyPress}
        // collectedCoins={collectedCoins} 
        setCollectedCoins={setCollectedCoins} 
      />
      <Blinky
        boardData={boardData}
        initialBoardData={initialBoardData}
        pacmanPosition={pacmanPosition}
        keyPressCount={keyPressCount}
        setCollectedCoins={setCollectedCoins} 
        setPacmanPosition={setPacmanPosition}

      />
            {/* <Pinky
        boardData={boardData}
        initialBoardData={initialBoardData}
        pacmanPosition={pacmanPosition}
        keyPressCount={keyPressCount}
        setCollectedCoins={setCollectedCoins} 
        pacmanDirection={pacmanDirection}
      /> */}
    </div>
  );
};

export default GamePage;