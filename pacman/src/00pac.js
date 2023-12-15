import React from 'react';

const Pac = ({ boardData }) => {
  return (
    <div className="grid grid-cols-30 gap-1">
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className={`w-10 h-10 border border-gray-300 ${getCellClass(cell)}`}>
</div>

          ))}
        </div>
      ))}
    </div>
  );
};



function getCellClass(cellValue) {
  switch (cellValue) {
    //below are tailwind classes (TEMPORARY FOR INDIVIDUAL COMPONENTS)
    case 'P':
        //pacman
      return 'bg-yellow-400'; 
    // ghostgang
    case 'G1':
      return 'bg-red-500'; // blinky
    case 'G2':
      return 'bg-blue-500'; // inky
    case 'G3':
      return 'bg-pink-500'; // pinky
    case 'G4':
      return 'bg-orange-500'; // clyde
    case 'C':
        //coins
      return 'bg-blue-300';
    case 'U':
        //powerups
      return 'bg-green-400'; 
    case 'X':
      return 'bg-black';
      //walls
    default:
        //empty cells
      return 'bg-gray-100'; 
  }
}

export default Pac;
