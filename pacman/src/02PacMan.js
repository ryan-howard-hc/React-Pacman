import React, { useEffect } from 'react';

const PacMan = ({ boardData, pacmanPosition, setPacmanPosition, setBoardData, handleKeyPress, blinkyPosition }) => {
  
  const handleKeyDown = (event) => {
    const { key } = event;
    const { row, col } = pacmanPosition;
  
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
        //checks if pacman is in the first column and moving left
        if (col === 0) {
          newCol = boardData[0].length - 1; //moves to the last column
        } else {
          newCol = col - 1;
        }
        break;
      case 'ArrowRight':
        //checks if pacman is in the last column and moving right
        if (col === boardData[0].length - 1) {
          newCol = 0; //moves to the first column
        } else {
          newCol = col + 1;
        }
        break;
      default:
        return;
    }
    const isBlinkyOnPowerUp = () => {
      return boardData[blinkyPosition.row][blinkyPosition.col] === 'U';
    };

    if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
      const newBoardData = [...boardData];
      newBoardData[row][col] = '.';
      newBoardData[newRow][newCol] = 'P';
      setBoardData(newBoardData);
      setPacmanPosition({ row: newRow, col: newCol });

    }
    handleKeyPress();
    console.log(`Pac-Man is at row: ${newRow}, col: ${newCol}`);

  };

  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardData, pacmanPosition, setPacmanPosition, setBoardData, handleKeyPress]);


  return null; 
};

export default PacMan;