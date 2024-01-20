import React, { useState, useEffect } from 'react';
import '../src/images/inky.png';

//gotta make sure to call pacmanPosition 
const Inky = ({ initialBoardData, pacmanPosition, keyPressCount, setCollectedCoins, setPacmanPosition }) => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [inkyPosition, setInkyPosition] = useState({ row:14, col: 12 });
  const [useInkyRuns, setUseInkyRuns] = useState(false);
  const [keyPressesAfterTrigger, setKeyPressesAfterTrigger] = useState(0);
  const [inkyMoveCount, setInkyMoveCount] = useState(0);
  const [movePatternComplete, setMovePatternComplete] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(''); //new state variable to store the current direction for movealongsequence

  const [pacmanMovementCount, setPacmanMovementCount] = useState(0);

  const [caughtInky, setCaughtInky] = useState(false);      //variable to capture/identify whether inky has been caught so I can reset movep attern 
  const [catchCount, setCatchCount] = useState(0);            // counts number of steps based on current count so it can reset without resetting counter
  const [isRunning, setIsRunning] = useState(false);
  const [runAwayPath, setRunAwayPath] = useState([]);

  const detectCollision = (pacmanPos, inkyPos) => {
    return pacmanPos.row === inkyPos.row && pacmanPos.col === inkyPos.col;
  };
  
const handleCollision = () => {
  const isCaught = detectCollision(pacmanPosition, inkyPosition);

  if (isCaught && !isRunning) {
    console.log('PACMAN COLLIDED WITH BLINKY');
    // Reset Pac-Man and Inky to starting positions
    setPacmanPosition({ row: 23, col: 13 });
    resetInkyPosition();
    resetCollidedSquare();
  }

  if (isCaught && isRunning) {
    console.log('BLINKY HAS BEEN CAUGHT');
    setCollectedCoins(prevCoins => prevCoins + 200);
    setCaughtInky(true);
    setCatchCount(0);
    resetInkyPosition();
  }
};

const resetCollidedSquare = () => {
  const { row, col } = inkyPosition;
  const newBoardData = [...boardData];
  newBoardData[row][col] = '.';
  setBoardData(newBoardData);
};

  const resetInkyPosition = () => {
    setInkyPosition({ row: 14, col: 12 });
  };
  



  useEffect(() => {
    setPacmanMovementCount(Math.floor(keyPressCount / 2)); // Assuming Pac-Man moves twice per key press
  }, [keyPressCount]);
  
  //"Breadth-First Search algorithm" genius. Finds shortest point between two points
  const inkysShortestPath = (start, target) => {
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
  


  const inkyRuns = (start, target) => {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const queue = [{ ...start, prev: null }];
    const visited = new Set();
    //keeps track of the positions inkys already visited to avoid going in circles or revisiting the same spots
  
    while (queue.length > 0) {
            //as long as there are positions he can move, keep moving
      const current = queue.shift(); //first position from the queue 
      const { row, col } = current;
  
      for (const [dx, dy] of directions) { 
        //checks each direction inky can move from its current position.

        const newRow = row + dx;
        let newCol = col + dy;
        //these two calculate new positions inky will be in if inky moves

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
  
          queue.push({ row: newRow, col: newCol, prev: current }); //if conditions are met,inky will add this new position to its queue to explore it later
          visited.add(`${newRow},${newCol}`);
        }
      }
    }
  
    return null;
  };
  

  
  const moveAlongSequence = () => {
    const directions = ['left', 'right', 'up', 'down'];
    let newRow = inkyPosition.row;
    let newCol = inkyPosition.col;
  
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }


    if (inkyMoveCount <= 6) {
      // Existing logic for initial movements
      if (inkyMoveCount === 0) {
        newRow = inkyPosition.row - 1;
        newCol = inkyPosition.col;
      } else if (inkyMoveCount === 1 || inkyMoveCount === 2) {
        newRow = inkyPosition.row;
        newCol = inkyPosition.col + 1;
      } else if (inkyMoveCount === 2 || inkyMoveCount === 3) {
        newRow = inkyPosition.row;
        newCol = inkyPosition.col + 1;
      } else if (inkyMoveCount === 3 || inkyMoveCount === 4) {
        newRow = inkyPosition.row - 1;
        newCol = inkyPosition.col;
      } else if (inkyMoveCount === 4 || inkyMoveCount === 5) {
        newRow = inkyPosition.row - 1;
        newCol = inkyPosition.col;
      } else if (inkyMoveCount === 5|| inkyMoveCount === 6) {
        newRow = inkyPosition.row ;
        newCol = inkyPosition.col - 1;
      } 
  
      if (
        newRow >= 0 &&
        newRow < boardData.length &&
        newCol >= 0 &&
        newCol < boardData[0].length &&
        (boardData[newRow][newCol] === '.' || boardData[newRow][newCol] === 'C')
      ) {
        updateInkyPosition(newRow, newCol);
      }
  
      if (inkyMoveCount === 6) {
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
        updateInkyPosition(newRow, newCol);
      }
    }
  
    setInkyMoveCount(prevCount => prevCount + 1);
  };
  
  
//   const moveInkyRandomly = () => {
//   const directions = ['left', 'right', 'up', 'down'];
//   const newDirection = directions[Math.floor(Math.random() * directions.length)];
//   let newRow = inkyPosition.row;
//   let newCol = inkyPosition.col;

//   if (newDirection === 'left' && newCol > 0 && (boardData[newRow][newCol - 1] === '.' || boardData[newRow][newCol - 1] === 'C')) {
//     newCol -= 1;
//   } else if (newDirection === 'right' && newCol < boardData[0].length - 1 && (boardData[newRow][newCol + 1] === '.' || boardData[newRow][newCol + 1] === 'C')) {
//     newCol += 1;
//   } else if (newDirection === 'up' && newRow > 0 && (boardData[newRow - 1][newCol] === '.' || boardData[newRow - 1][newCol] === 'C')) {
//     newRow -= 1;
//   } else if (newDirection === 'down' && newRow < boardData.length - 1 && (boardData[newRow + 1][newCol] === '.' || boardData[newRow + 1][newCol] === 'C')) {
//     newRow += 1;
//   }

//   updateInkyPosition(newRow, newCol);
// };
  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//calculates the shortest path using the bfsShortestPath function. clears inkys previous position and sets its new position

const moveInkyTowardsPacman = () => {
  if (
    (pacmanPosition.row === 23 && pacmanPosition.col === 25) ||
    (pacmanPosition.row === 3 && pacmanPosition.col === 1) ||
    (pacmanPosition.row === 3 && pacmanPosition.col === 25) ||
    (pacmanPosition.row === 23 && pacmanPosition.col === 1)
  ) {
    console.log('RUN BLINKY!');

    setUseInkyRuns(true);
    setKeyPressesAfterTrigger(0);
  }

  if (useInkyRuns && keyPressesAfterTrigger < 50) {
    setIsRunning(true);
    if (keyPressesAfterTrigger % 2 === 0) {
      const pathNode = inkyRuns(inkyPosition, pacmanPosition);
      
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
          updateInkyPosition(nextPosition.row, nextPosition.col);
        }
      }
    }

    setKeyPressesAfterTrigger(prevCount => prevCount + 1);
  } else {
    setIsRunning(false);
    const pathNode = inkysShortestPath(inkyPosition, pacmanPosition);

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
        updateInkyPosition(nextPosition.row, nextPosition.col);
      }
    }
  }
};

const moveInkyVisual = (row, col) => {
  // Move Inky visually without affecting the board data??????????????????????
  console.log(`Inky is at row: ${row}, col: ${col}`);
};

const updateInkyPosition = (row, col) => {
  const newBoardData = [...boardData];
  const cellValue = newBoardData[row][col];

  if (cellValue === 'C') {
    // Inky moves over 'C' block without changing anything??????????????
    newBoardData[inkyPosition.row][inkyPosition.col] = 'C'; 
    newBoardData[row][col] = 'G2'; 
    setBoardData(newBoardData);

    setInkyPosition({ row, col });
    moveInkyVisual(row, col);
  } else if (cellValue === '.') {
    newBoardData[inkyPosition.row][inkyPosition.col] = '.'; 
    newBoardData[row][col] = 'G2';
    setBoardData(newBoardData);
    setInkyPosition({ row, col });
    moveInkyVisual(row, col);
  } else if (cellValue === 'U') {
    newBoardData[inkyPosition.row][inkyPosition.col] = 'U';
    newBoardData[row][col] = 'G2'; 
    setBoardData(newBoardData);

    setInkyPosition({ row, col });
    moveInkyVisual(row, col);
  } else if (cellValue === 'G1' || cellValue === 'G3' || cellValue === 'G4') {
    // Inky moves through G1, G3, or G4 without altering them??????????
    newBoardData[row][col] = cellValue;
    setBoardData(newBoardData);
    setInkyPosition({ row, col });
    moveInkyVisual(row, col);
  }
};






// const updateInkyPosition = (row, col) => {
//   setInkyPosition({ row, col });
//   console.log(`Inky is at row: ${row}, col: ${col}`);
// };


useEffect(() => {
  if (caughtInky) {
    if (catchCount < 20) { 
      moveAlongSequence();
      setCatchCount(prevCount => prevCount + 1);
    } else {
      setCaughtInky(false); 
    }
  } else {
    if (keyPressCount < 50) {
      moveAlongSequence();
    } else {
    //   moveInkyTowardsPacman();
    }
  }
  handleCollision();
}, [keyPressCount, pacmanPosition, caughtInky, catchCount]);

  

  return (
    <div className="inky-container">

    </div>
  );
};

export default Inky; 