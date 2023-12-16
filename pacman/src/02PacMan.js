import React, { useEffect } from 'react';

const PacMan = ({ boardData, pacmanPosition, setPacmanPosition, setBoardData }) => {
  const handleKeyDown = (event) => {
    const { key } = event;
    const { row, col } = pacmanPosition;

    // new position based on key press
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
      const newBoardData = [...boardData];
      newBoardData[row][col] = '.';
      newBoardData[newRow][newCol] = 'P';
      setBoardData(newBoardData);
      setPacmanPosition({ row: newRow, col: newCol });
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