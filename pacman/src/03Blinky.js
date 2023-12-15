import React, { useState, useEffect } from 'react';

const Blinky = ({ initialBoardData, pacmanPosition }) => {
    const [boardData, setBoardData] = useState(initialBoardData);
  const [blinkyPosition, setBlinkyPosition] = useState({ row:14, col: 11 });


  const calculateDirection = () => {
    const { row: blinkyRow, col: blinkyCol } = blinkyPosition;
    const { row: pacRow, col: pacCol } = pacmanPosition;

    // difference between the positions of blinky and pacman
    const rowDiff = pacRow - blinkyRow;
    const colDiff = pacCol - blinkyCol;

    // direction based on the difference in positions (Thanks gpt, Im an idiot)
    let direction = '';
    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
      direction = rowDiff > 0 ? 'down' : 'up';
    } else {
      direction = colDiff > 0 ? 'right' : 'left';
    }

    return direction;
  };

  const moveBlinkyTowardsPacman = () => {
    const direction = calculateDirection();
  
    const { row: blinkyRow, col: blinkyCol } = blinkyPosition;
    let newRow = blinkyRow;
    let newCol = blinkyCol;
  
    // Update the new position based on the calculated direction
    switch (direction) {
      case 'up':
        newRow -= 1;
        break;
      case 'down':
        newRow += 1;
        break;
      case 'left':
        newCol -= 1;
        break;
      case 'right':
        newCol += 1;
        break;
      default:
        break;
    }
  
    // check if X
    if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
      const newBoardData = [...boardData];
      newBoardData[blinkyRow][blinkyCol] = '.'; // clears previous position to calculate for new position
      newBoardData[newRow][newCol] = 'G1'; // sets new position
      setBoardData(newBoardData); // updates board
      setBlinkyPosition({ row: newRow, col: newCol }); //updates blkinkys new spot
    }
  };

//    handle Blinky's movement each time Pac-Man moves??????????????????
//   const handlePacmanMove = (pacmanPosition) => {
//     moveBlinkyTowardsPacman(pacmanPosition);
//   };

//   useEffect(() => {
//     event listener for pacman movement
//     when Pac-Man moves, call handlePacmanMove with pacman position


//   }, [boardData, blinkyPosition]);

  return (
    <div className="blinky-container">
        {/* nlinky image when i want to add it */}
    </div>
  );
};

export default Blinky;