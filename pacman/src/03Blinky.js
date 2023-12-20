import React, { useState, useEffect } from 'react';

//gotta make sure to call pacmanPosition 
const Blinky = ({ initialBoardData, pacmanPosition }) => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [blinkyPosition, setBlinkyPosition] = useState({ row:14, col: 11 });


  
  //"Breadth-First Search algorithm" genius. Finds shortest point between two points
  const blinkysShortestPath = (start, target) => {
    const queue = [{ ...start, prev: null }];
    const visited = new Set();
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; //up,down,right,left
  
    while (queue.length > 0) {
      const current = queue.shift();
      const { row, col } = current;
  
      if (row === target.row && col === target.col) {
        return current;
      }
  
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
  
        if (
          newRow >= 0 &&
          newRow < boardData.length &&
          newCol >= 0 &&
          newCol < boardData[0].length &&
          boardData[newRow][newCol] !== 'X' && //checks valid position. cant go through walls
          !visited.has(`${newRow},${newCol}`)
        ) {
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
        const newCol = col + dy;
        //these two calculate new positions blinky will be in if blinky moves

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
  
  
  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//calculates the shortest path using the bfsShortestPath function. clears blinkys previous position and sets its new position

const moveBlinkyTowardsPacman = () => {
  let pathNode = null;

  if (pacmanPosition.row === 22 && pacmanPosition.col === 25) {
    pathNode = blinkyRuns(blinkyPosition, pacmanPosition);
  } else {
    pathNode = blinkysShortestPath(blinkyPosition, pacmanPosition);
  }

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
};


  const updateBlinkyPosition = (row, col) => {
    const newBoardData = [...boardData];
    newBoardData[blinkyPosition.row][blinkyPosition.col] = '.';
    newBoardData[row][col] = 'G1';
    setBoardData(newBoardData);
    setBlinkyPosition({ row, col });
  };

  useEffect(() => {
    moveBlinkyTowardsPacman(pacmanPosition);
  }, [pacmanPosition]);

  

  return (
    <div className="blinky-container">
        {/* nlinky image when i want to add it */}
    </div>
  );
};

export default Blinky; 