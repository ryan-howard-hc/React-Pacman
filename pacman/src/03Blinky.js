import React, { useState, useEffect } from 'react';

//gotta make sure to call pacmanPosition 
const Blinky = ({ initialBoardData, pacmanPosition, keyPressCount }) => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [blinkyPosition, setBlinkyPosition] = useState({ row:14, col: 11 });
  const [useBlinkyRuns, setUseBlinkyRuns] = useState(false);
  const [keyPressesAfterTrigger, setKeyPressesAfterTrigger] = useState(0);
  const [blinkyMoveCount, setBlinkyMoveCount] = useState(0);
  const [movePatternComplete, setMovePatternComplete] = useState(false);
  
  const [pacmanMovementCount, setPacmanMovementCount] = useState(0);
  useEffect(() => {
    setPacmanMovementCount(Math.floor(keyPressCount / 2)); // Assuming Pac-Man moves twice per key press
  }, [keyPressCount]);
  
  //"Breadth-First Search algorithm" genius. Finds shortest point between two points
  const blinkysShortestPath = (start, target) => {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const queue = [{ ...start, prev: null }];
    const visited = new Set();
  
    while (queue.length > 0) {
      const current = queue.shift();
      const { row, col } = current;
  
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        let newCol = col + dy;
  
        if (newCol < 0) {
          newCol = boardData[0].length - 1; // Move to the last column
        } else if (newCol >= boardData[0].length) {
          newCol = 0; // Move to the first column
        }
  
        if (
          newRow >= 0 &&
          newRow < boardData.length &&
          boardData[newRow][newCol] !== 'X' &&
          !visited.has(`${newRow},${newCol}`)
        ) {
          if (newRow === target.row && newCol === target.col) {
            return current;
          }
  
          queue.push({ row: newRow, col: newCol, prev: current });
          visited.add(`${newRow},${newCol}`);
        }
      }
    }
  
    return null;
  };

  const blinkyRuns = (start, target) => {
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
  

  
  const moveAlongRandomRow = () => {
    const leftBoxBound = 11;
    const rightBoxBound = 17;
    const topBoxBound = 13;
    const bottomBoxBound = 18;
  
    let newRow, newCol;
  
    if (blinkyMoveCount === 0) {
      newRow = blinkyPosition.row - 1;
      newCol = blinkyPosition.col; 
    } else if (blinkyMoveCount === 1 || blinkyMoveCount === 2) {
      newRow = blinkyPosition.row;
      newCol = blinkyPosition.col + 1;
    } else if (blinkyMoveCount === 2 || blinkyMoveCount === 3) {
      newRow = blinkyPosition.row;
      newCol = blinkyPosition.col + 1;
    } else if (blinkyMoveCount === 3 || blinkyMoveCount === 4) {
      newRow = blinkyPosition.row - 1;
      newCol = blinkyPosition.col; 
    } else if (blinkyMoveCount === 4 || blinkyMoveCount === 5) {
      newRow = blinkyPosition.row - 1;
      newCol = blinkyPosition.col; 
    } else if (blinkyMoveCount === 5 || blinkyMoveCount === 6) {
      newRow = blinkyPosition.row - 1;
      newCol = blinkyPosition.col;
    }
  
    // checks if the movement is within boundaries and valid
    if (
      newRow >= 0 &&
      newRow < boardData.length &&
      newCol >= 0 &&
      newCol < boardData[0].length &&
      boardData[newRow][newCol] === '.' &&
      (blinkyMoveCount >= 5 ||
        !( // Prevent movement into the restricted area
          newRow < topBoxBound ||
          newRow > bottomBoxBound ||
          newCol < leftBoxBound ||
          newCol > rightBoxBound
        ))
    ) {
      updateBlinkyPosition(newRow, newCol);
    } else {
      // Move randomly until an obstacle is encountered
      const directions = [
        { rowChange: -1, colChange: 0 }, // Move up
        { rowChange: 0, colChange: 1 }, // Move right
        { rowChange: 0, colChange: -1 }, // Move left
        { rowChange: 1, colChange: 0 }, // Move down
      ];
  
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      newRow = blinkyPosition.row + randomDirection.rowChange;
      newCol = blinkyPosition.col + randomDirection.colChange;
  
      if (
        newRow >= 0 &&
        newRow < boardData.length &&
        newCol >= 0 &&
        newCol < boardData[0].length &&
        boardData[newRow][newCol] === '.' &&
        !( // Prevent movement into the restricted area
          newRow < topBoxBound ||
          newRow > bottomBoxBound ||
          newCol < leftBoxBound ||
          newCol > rightBoxBound
        )
      ) {
        updateBlinkyPosition(newRow, newCol);
      }
    }
  
    setBlinkyMoveCount(prevCount => prevCount + 1);
  };
  
  
  
  
  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//calculates the shortest path using the bfsShortestPath function. clears blinkys previous position and sets its new position

const moveBlinkyTowardsPacman = () => {
  if (
    (pacmanPosition.row === 23 && pacmanPosition.col === 25) ||
    (pacmanPosition.row === 3 && pacmanPosition.col === 1) ||
    (pacmanPosition.row === 3 && pacmanPosition.col === 25) ||
    (pacmanPosition.row === 23 && pacmanPosition.col === 1)
  ) {
    console.log('RUN BLINKY!');

    setUseBlinkyRuns(true);
    setKeyPressesAfterTrigger(0);
  }

  if (useBlinkyRuns && keyPressesAfterTrigger < 30) {
    if (keyPressesAfterTrigger % 2 === 0) {
      const pathNode = blinkyRuns(blinkyPosition, pacmanPosition);
      
      if (pathNode) {
        const path = [];
        let currentNode = pathNode;

        while (currentNode !== null) {
          path.push(currentNode);
          currentNode = currentNode.prev;
        }
        path.pop();

        if (path.length > 0) {
          const nextPosition = path.pop();
          updateBlinkyPosition(nextPosition.row, nextPosition.col);
        }
      }
    }

    setKeyPressesAfterTrigger(prevCount => prevCount + 1);
  } else {
    const pathNode = blinkysShortestPath(blinkyPosition, pacmanPosition);

    if (pathNode) {
      const path = [];
      let currentNode = pathNode;

      while (currentNode !== null) {
        path.push(currentNode);
        currentNode = currentNode.prev;
      }
      path.pop();

      if (path.length > 0) {
        const nextPosition = path.pop();
        updateBlinkyPosition(nextPosition.row, nextPosition.col);
      }
    }
  }
};

const updateBlinkyPosition = (row, col) => {
  const newBoardData = [...boardData];
  const cellValue = newBoardData[row][col];

  if (cellValue !== 'U') {
    newBoardData[blinkyPosition.row][blinkyPosition.col] = '.';
    newBoardData[row][col] = 'G1';
    setBoardData(newBoardData);
    setBlinkyPosition({ row, col });
  } else {
    const rowDiff = row - blinkyPosition.row;
    const colDiff = col - blinkyPosition.col;
    const nextRow = row + rowDiff;
    const nextCol = col + colDiff;

    if (newBoardData[nextRow]?.[nextCol] !== undefined) {
      newBoardData[blinkyPosition.row][blinkyPosition.col] = '.';
      newBoardData[nextRow][nextCol] = 'U'; // makes the power-up remain in the cell after Blinky passes over it
      setBoardData(newBoardData);
      setBlinkyPosition({ row: nextRow, col: nextCol });
    } else {
      newBoardData[blinkyPosition.row][blinkyPosition.col] = 'U';
      setBoardData(newBoardData);
      setBlinkyPosition({ row, col });
    }
  }
};



useEffect(() => {
  if (keyPressCount < 50) {
    moveAlongRandomRow();
  } else {
    moveBlinkyTowardsPacman();
  }
}, [keyPressCount, pacmanPosition]);

  

  return (
    <div className="blinky-container">
        {/* nlinky image when i want to add it */}
    </div>
  );
};

export default Blinky; 