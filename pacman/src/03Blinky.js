import React, { useState, useEffect } from 'react';

//gotta make sure to call pacmanPosition 
const Blinky = ({ initialBoardData, pacmanPosition }) => {
    const [boardData, setBoardData] = useState(initialBoardData);
  const [blinkyPosition, setBlinkyPosition] = useState({ row:14, col: 11 });



  const [moveAwayTimer, setMoveAwayTimer] = useState(0);


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
  

//calculates the shortest path using the bfsShortestPath function. clears blinkys previous position and sets its new position
  const moveBlinkyTowardsPacman = () => {

    if (moveAwayTimer > 0) {
      // Decrease the timer and continue moving Blinky away
      setMoveAwayTimer(prevTimer => prevTimer - 1);

      // Code to move Blinky away from Pacman using the 'oppositePath'
      const oppositePathNode = blinkysShortestPath(blinkyPosition, pacmanPosition);
      if (oppositePathNode) {
        const oppositePath = [];
        let currentBlinky = oppositePathNode;

        while (currentBlinky !== null) {
          oppositePath.push(currentBlinky);
          currentBlinky = currentBlinky.prev;
        }
        oppositePath.pop();

        if (oppositePath.length > 0) {
          const nextPosition = oppositePath.pop();
          setBoardAndPosition(nextPosition.row, nextPosition.col);
        }
      }
    } else {

    const shortestPathNode = blinkysShortestPath(blinkyPosition, pacmanPosition);
    //Calls the blinkysShortestPath function with nlinkys current position and pacman position (called in 'Blinky') to find the shortest path.



    if (shortestPathNode) {     //checks if a shortest path is found. if shortestPathNode exists/is not null, executes the following code block
      const path = [];       
      let currentBlinky = shortestPathNode; //initializes an empty array called path to store the path, sets currentBlinky as the shortestPathNode


      // loop to reconstruct the path by iterating from the shortestPathNode to the starting point (blinkys current position). This loop iterates until current becomes null
      // reconstructs path by tracing back from the target to the start
      while (currentBlinky !== null) {
        path.push(currentBlinky);               // pushes each node (position) to the path array
        currentBlinky = currentBlinky.prev;       // moves to the previous node in the path
      }
      path.pop(); // removes last node from the path array. blinkys current position



      // checks if there are positions in the path to move him/ basically keeps him on track and chasing
      if (path.length > 0) {
        const nextPosition = path.pop();          
        setBoardAndPosition(nextPosition.row, nextPosition.col);    //sets the board and blinkys position to the next position retrieved from the path
      }
    }
  }
  };

  const setBoardAndPosition = (row, col) => {
    const newBoardData = [...boardData];
    newBoardData[blinkyPosition.row][blinkyPosition.col] = '.'; //clear previous position
    newBoardData[row][col] = 'G1'; //set new position for blinky
    setBoardData(newBoardData); //update the board
    setBlinkyPosition({ row, col }); //update blinky's new position
  };



  const moveBlinkyAway = () => {
    const duration = 20; //  10 steps for start

    setMoveAwayTimer(duration);
  };




  //listens for changes in pacmanPosition and triggers blinky
  useEffect(() => {
    console.log('Pacman position or boardData changed');

    moveBlinkyTowardsPacman();
  }, [pacmanPosition, moveAwayTimer]);
  
  useEffect(() => {
    const pacmanTile = boardData[pacmanPosition.row][pacmanPosition.col];
    console.log(`Pacman tile value: '${pacmanTile}'`);
  
    if (pacmanTile === 'U') {
      console.log('Pacman is on a "U" block');
      moveBlinkyAway();
    }
  }, [pacmanPosition, boardData]); 
  

  return (
    <div className="blinky-container">
        {/* nlinky image when i want to add it */}
    </div>
  );
};

export default Blinky; 