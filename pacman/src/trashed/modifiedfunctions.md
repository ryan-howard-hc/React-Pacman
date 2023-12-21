
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







    // if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
    //   const nextTile = boardData[newRow][newCol];

    //   if (nextTile !== 'X') {
    //     setPacmanPosition({ row: newRow, col: newCol });
    //   }
    //







