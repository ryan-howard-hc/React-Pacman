// import { useState, useEffect } from 'react';

// const movement = (initialPosition, boardData) => {
//   const [position, setPosition] = useState(initialPosition);

//   const handleMovement = (key) => {
//     const { row, col } = position;
//     let newRow = row;
//     let newCol = col;

//     switch (key) {
//       case 'ArrowUp':
//         newRow = row - 1;
//         break;
//       case 'ArrowDown':
//         newRow = row + 1;
//         break;
//       case 'ArrowLeft':
//         if (col === 0) {
//           newCol = boardData[0].length - 1;
//         } else {
//           newCol = col - 1;
//         }
//         break;
//       case 'ArrowRight':
//         if (col === boardData[0].length - 1) {
//           newCol = 0;
//         } else {
//           newCol = col + 1;
//         }
//         break;
//       default:
//         return;
//     }

//     if (boardData[newRow] && boardData[newRow][newCol] !== 'X') {
//       const newBoardData = boardData.map(rowData => [...rowData]);
//       newBoardData[row][col] = '.';
//       newBoardData[newRow][newCol] = 'P'; // Assuming 'P' for Pac-Man, adjust for ghosts

//       setPosition({ row: newRow, col: newCol });
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       const { key } = event;
//       handleMovement(key);
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [boardData, position]);

//   return { position };
// };

// export default movement;