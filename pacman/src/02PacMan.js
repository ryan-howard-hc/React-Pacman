import React, { useEffect } from 'react';

const PacMan = ({ boardData, pacmanPosition, setPacmanPosition, setBoardData }) => {
  const handleKeyDown = (event) => {
    console.log('handleKeyDown function called.');

    const { key } = event;
    const { row, col } = pacmanPosition;
    
    console.log('Pacman Position:', pacmanPosition);
    console.log('Board Data:', boardData);
  
  
    let newRow = row;
    let newCol = col;

    switch (key) {
      case 'ArrowUp':
        newRow = row - 1;
        break;
      case 'ArrowDown':
        newRow = row + 1;
        break;
      case 'ArrowLeft':
        newCol = col - 1;
        break;
      case 'ArrowRight':
        newCol = col + 1;
        break;
      default:
        return;
    }

    if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
      const previousTile = boardData[newRow][newCol]; // captures the previous value before any change
    
      if (previousTile !== 'P') {
        const newBoardData = boardData.map((row) => [...row]);
        newBoardData[row][col] = previousTile; // updates with the previous tile value
        newBoardData[newRow][newCol] = 'P';
    
        console.log(`Previous tile value: ${previousTile}`); // previous tile value
        console.log(`New tile value: P`); //  new tile value
    
        setBoardData(newBoardData);
        setPacmanPosition({ row: newRow, col: newCol });
      }
    }
    
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardData, pacmanPosition, setPacmanPosition, setBoardData]);



  

  return null; // placeholder for image if i want to add
};

export default PacMan;