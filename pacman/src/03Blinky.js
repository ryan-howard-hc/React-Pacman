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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//calculates the shortest path using the bfsShortestPath function. clears blinkys previous position and sets its new position
const moveBlinkyTowardsPacman = () => {
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