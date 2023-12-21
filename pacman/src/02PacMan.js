import React, { useEffect } from 'react';

const PacMan = ({ boardData, pacmanPosition, setPacmanPosition, setBoardData, handleKeyPress }) => {
  
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


    // if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
    //   const nextTile = boardData[newRow][newCol];

    //   if (nextTile !== 'X') {
    //     setPacmanPosition({ row: newRow, col: newCol });
    //   }
    //



    if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
      const newBoardData = [...boardData];
      newBoardData[row][col] = '.';
      newBoardData[newRow][newCol] = 'P';
      setBoardData(newBoardData);
      setPacmanPosition({ row: newRow, col: newCol });



      // const previousTile = boardData[newRow][newCol]; // captures the previous value before any change
    
      // if (previousTile !== 'P') {
      //   const newBoardData = boardData.map((row) => [...row]);
      //   newBoardData[row][col] = previousTile; // updates with the previous tile value
      //   newBoardData[newRow][newCol] = 'P';
    
      //   console.log(`Previous tile value: ${previousTile}`); // previous tile value
      //   console.log(`New tile value: P`); //  new tile value
    
      //   setBoardData(newBoardData);
      //   setPacmanPosition({ row: newRow, col: newCol });
      // }
    }
    handleKeyPress();

  };

  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardData, pacmanPosition, setPacmanPosition, setBoardData, handleKeyPress]);



  

  return null; // placeholder for image if i want to add
};

export default PacMan;