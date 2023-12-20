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
    ['X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X', 'G1', 'G2', '.', 'G3', 'G4', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'X'],
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
  const [pacmanOnU, setPacmanOnU] = useState(false);
  const [moveAwayTimer, setMoveAwayTimer] = useState(0);

  useEffect(() => {
    const pacmanTile = boardData[pacmanPosition.row][pacmanPosition.col];

    if (pacmanTile === 'U') {
      console.log('Pacman is on a "U" block');
      setPacmanOnU(true);
      setMoveAwayTimer(20);
    } else {
      setPacmanOnU(false);
    }
  }, [pacmanPosition, boardData]);

  return (
    <div className="game-container">
      <h1>Pac-Man Game</h1>
      <Pac boardData={boardData} />

      <PacMan
        initialBoardData={initialBoardData}
        boardData={boardData}
        pacmanPosition={pacmanPosition}
        setPacmanPosition={setPacmanPosition}
        setBoardData={setBoardData}
        setPacmanOnU={setPacmanOnU}
        
      />
      <Blinky
        boardData={boardData}
        initialBoardData={initialBoardData}
        pacmanPosition={pacmanPosition}
        setMoveAwayTimer={setMoveAwayTimer}
        moveAwayTimer={moveAwayTimer}
        pacmanOnU={pacmanOnU}
      />
    </div>
  );
};

export default GamePage;