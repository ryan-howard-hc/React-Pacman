import React, { useState, useEffect } from 'react';

const Pinky = ({ initialBoardData, pacmanPosition, keyPressCount, setCollectedCoins }) => {
    const [boardData, setBoardData] = useState(initialBoardData);
    const [usePlinkyRuns, setUsePinkyRuns] = useState(false);

    const [pinkyPosition, setPinkyPosition] = useState({ row:14, col: 14 });
    const [pinkyMoveCount, setPinkyMoveCount] = useState(0);



    const detectCollision = (pacmanPos, pinkyPos) => {
        return pacmanPos.row === pinkyPos.row && pacmanPos.col === pinkyPos.col;
      };

    const handleCollision = () => {                 //REUSABLE
        const isCaught = detectCollision(pacmanPosition, pinkyPosition);
      
        if (isCaught && isRunning) {
          console.log('PINKY HAS BEEN CAUGHT');
          setCollectedCoins(prevCoins => prevCoins + 200);
    
          resetPinkyPosition();
        }
      };
    
      const resetPinkyPosition = () => {
        setPinkyPosition({ row: 14, col: 14 });
      };


      const updatePinkyPosition = (row, col) => {
        const newBoardData = [...boardData];
        const cellValue = newBoardData[row][col];
      
        if (cellValue !== 'U') {
          const originalCellValue = cellValue === 'C' || cellValue === '.' ? cellValue : 'G1';
          newBoardData[pinkyPosition.row][pinkyPosition.col] = originalCellValue;
          newBoardData[row][col] = 'G1';
          setBoardData(newBoardData);
          setPinkyPosition({ row, col });
          console.log(`Pinky is at row: ${row}, col: ${col}`);
        } else {
          const rowDiff = row - pinkyPosition.row;
          const colDiff = col - pinkyPosition.col;
          const nextRow = row + rowDiff;
          const nextCol = col + colDiff;
      
          if (newBoardData[nextRow]?.[nextCol] !== undefined) {
            newBoardData[pinkyPosition.row][pinkyPosition.col] = '.';
            newBoardData[nextRow][nextCol] = 'U'; // makes the power-up remain in the cell after Pinky passes over it
            setBoardData(newBoardData);
            setPinkyPosition({ row: nextRow, col: nextCol });
            console.log(`Pinky is at row: ${nextRow}, col: ${nextCol}`);
      
          } else {
            newBoardData[pinkyPosition.row][pinkyPosition.col] = 'U';
            setBoardData(newBoardData);
            setPinkyPosition({ row, col });
            console.log(`Pinky is at row: ${row}, col: ${col}`);
      
          }
        }
      };


      const pinkyRuns = (start, target) => {
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const queue = [{ ...start, prev: null }];
        const visited = new Set();
        //keeps track of the positions blinkys already visited to avoid going in circles or revisiting the same spots
      
        while (queue.length > 0) {
                //as long as there are positions he can move, keep moving
          const current = queue.shift(); //first position from the queue 
          const { row, col } = current;
      
          for (const [dx, dy] of directions) { 
            //checks each direction blinky can move from its current position.
    
            const newRow = row + dx;
            let newCol = col + dy;
            //these two calculate new positions blinky will be in if blinky moves
    
            if (newCol < 0) {
              newCol = boardData[0].length - 1; //moves to the last column
            } else if (newCol >= boardData[0].length) {
              newCol = 0; //moves to the first column
            }
    
            if (
              //if statement to check if move is valid
              newRow >= 0 &&
              newRow < boardData.length &&
              newCol >= 0 &&
              newCol < boardData[0].length &&
              boardData[newRow][newCol] !== 'X' &&
              !visited.has(`${newRow},${newCol}`) //visited is to prevent endless loop
              
            ) {
              const distanceFromPacman = Math.sqrt(
                Math.pow(target.row - newRow, 2) + Math.pow(target.col - newCol, 2)
              );
      
              if (distanceFromPacman > 5) {
                return { row: newRow, col: newCol, prev: current };
              }
      
              queue.push({ row: newRow, col: newCol, prev: current }); //if conditions are met,blinky will add this new position to its queue to explore it later
              visited.add(`${newRow},${newCol}`);
            }
          }
        }
      
        return null;
      };










};
    export default Pinky; 