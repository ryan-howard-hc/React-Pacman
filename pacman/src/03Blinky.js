import React, { useState, useEffect } from 'react';
import '../src/images/ghost.png';

//gotta make sure to call pacmanPosition 
const Blinky = ({ initialBoardData, pacmanPosition, keyPressCount, setCollectedCoins, setPacmanPosition }) => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [blinkyPosition, setBlinkyPosition] = useState({ row:14, col: 11 });
  const [useBlinkyRuns, setUseBlinkyRuns] = useState(false);
  const [keyPressesAfterTrigger, setKeyPressesAfterTrigger] = useState(0);
  const [blinkyMoveCount, setBlinkyMoveCount] = useState(0);
  const [movePatternComplete, setMovePatternComplete] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(''); //new state variable to store the current direction for movealongsequence

  const [pacmanMovementCount, setPacmanMovementCount] = useState(0);

  const [caughtBlinky, setCaughtBlinky] = useState(false);      //variable to capture/identify whether blinky has been caught so I can reset movep attern 
  const [catchCount, setCatchCount] = useState(0);            // counts number of steps based on current count so it can reset without resetting counter
  const [isRunning, setIsRunning] = useState(false);
  const [runAwayPath, setRunAwayPath] = useState([]);

  const detectCollision = (pacmanPos, blinkyPos) => {
    return pacmanPos.row === blinkyPos.row && pacmanPos.col === blinkyPos.col;
  };
  
const handleCollision = () => {
  const isCaught = detectCollision(pacmanPosition, blinkyPosition);

  if (isCaught && !isRunning) {
    console.log('PACMAN COLLIDED WITH BLINKY');
    // Reset Pac-Man and Blinky to starting positions
    setPacmanPosition({ row: 23, col: 13 });
    resetBlinkyPosition();
    resetCollidedSquare();
  }

  if (isCaught && isRunning) {
    console.log('BLINKY HAS BEEN CAUGHT');
    setCollectedCoins(prevCoins => prevCoins + 200);
    setCaughtBlinky(true);
    setCatchCount(0);
    resetBlinkyPosition();
  }
};

const resetCollidedSquare = () => {
  const { row, col } = blinkyPosition;
  const newBoardData = [...boardData];
  newBoardData[row][col] = '.';
  setBoardData(newBoardData);
};

  const resetBlinkyPosition = () => {
    setBlinkyPosition({ row: 14, col: 11 });
  };
  



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


  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };
  


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
  

  
  const moveAlongSequence = () => {
    const directions = ['left', 'right', 'up', 'down'];
    let newRow = blinkyPosition.row;
    let newCol = blinkyPosition.col;
  
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }


    if (blinkyMoveCount <= 6) {
      // Existing logic for initial movements
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
      } else if (blinkyMoveCount === 5|| blinkyMoveCount === 6) {
        newRow = blinkyPosition.row ;
        newCol = blinkyPosition.col - 1;
      } 
  
      if (
        newRow >= 0 &&
        newRow < boardData.length &&
        newCol >= 0 &&
        newCol < boardData[0].length &&
        (boardData[newRow][newCol] === '.' || boardData[newRow][newCol] === 'C')
      ) {
        updateBlinkyPosition(newRow, newCol);
      }
  
      if (blinkyMoveCount === 6) {
        setMovePatternComplete(true);
      }
    } else {
      let moveMade = false; // tracks if a move was made in this iteration

      // checksk if there's a current direction
      if (currentDirection) {
        // Continue moving in the current direction if possible
        if (currentDirection === 'left' && newCol > 0 && (boardData[newRow][newCol - 1] === '.' || boardData[newRow][newCol - 1] === 'C')) {
          newCol -= 1;
          moveMade = true;
        } else if (currentDirection === 'right' && newCol < boardData[0].length - 1 && (boardData[newRow][newCol + 1] === '.' || boardData[newRow][newCol + 1] === 'C')) {
          newCol += 1;
          moveMade = true;
        } else if (currentDirection === 'up' && newRow > 0 && (boardData[newRow - 1][newCol] === '.' || boardData[newRow - 1][newCol] === 'C')) {
          newRow -= 1;
          moveMade = true;
        } else if (currentDirection === 'down' && newRow < boardData.length - 1 && (boardData[newRow + 1][newCol] === '.' || boardData[newRow + 1][newCol] === 'C')) {
          newRow += 1;
          moveMade = true;
        }
      }
  
      // if no move was made, choose a new random direction
      if (!moveMade) {
        const newDirection = directions[Math.floor(Math.random() * directions.length)];
        setCurrentDirection(newDirection);
      }
  
      // updates position if a move was made
      if (moveMade) {
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

  if (useBlinkyRuns && keyPressesAfterTrigger < 50) {
    setIsRunning(true);
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
    setIsRunning(false);
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

const moveBlinkyVisual = (row, col) => {
  // Move Blinky visually without affecting the board data??????????????????????
  console.log(`Blinky is at row: ${row}, col: ${col}`);
};

const updateBlinkyPosition = (row, col) => {
  const newBoardData = [...boardData];
  const cellValue = newBoardData[row][col];

  if (cellValue === 'C') {
    // Blinky moves over 'C' block without changing anything??????????????
    newBoardData[blinkyPosition.row][blinkyPosition.col] = 'C'; 
    newBoardData[row][col] = 'G1'; 
    setBoardData(newBoardData);

    setBlinkyPosition({ row, col });
    moveBlinkyVisual(row, col);
  } else if (cellValue === '.') {
    newBoardData[blinkyPosition.row][blinkyPosition.col] = '.'; 
    newBoardData[row][col] = 'G1';
    setBoardData(newBoardData);
    setBlinkyPosition({ row, col });
    moveBlinkyVisual(row, col);
  } else if (cellValue === 'U') {
    newBoardData[blinkyPosition.row][blinkyPosition.col] = 'U';
    newBoardData[row][col] = 'G1'; 
    setBoardData(newBoardData);

    setBlinkyPosition({ row, col });
    moveBlinkyVisual(row, col);
  } else if (cellValue === 'G2' || cellValue === 'G3' || cellValue === 'G4') {
    // Blinky moves through G2, G3, or G4 without altering them??????????
    newBoardData[row][col] = cellValue;
    setBoardData(newBoardData);
    setBlinkyPosition({ row, col });
    moveBlinkyVisual(row, col);
  }
};






// const updateBlinkyPosition = (row, col) => {
//   setBlinkyPosition({ row, col });
//   console.log(`Blinky is at row: ${row}, col: ${col}`);
// };


useEffect(() => {
  if (caughtBlinky) {
    if (catchCount < 20) { 
      moveAlongSequence();
      setCatchCount(prevCount => prevCount + 1);
    } else {
      setCaughtBlinky(false); 
    }
  } else {
    if (keyPressCount < 50) {
      moveAlongSequence();
    } else {
      moveBlinkyTowardsPacman();
    }
  }
  handleCollision();
}, [keyPressCount, pacmanPosition, caughtBlinky, catchCount]);

  

  return (
    <div className="blinky-container">

    </div>
  );
};

export default Blinky; 