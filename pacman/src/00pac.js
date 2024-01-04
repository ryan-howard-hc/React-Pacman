import React from 'react';
import blinky from '../src/images/blinky.png';
import pinky from '../src/images/pinky.png';
import inky from '../src/images/inky.png';
import clyde from '../src/images/clyde.png';
import dot from '../src/images/dot.png';



const Pac = ({ boardData }) => {
  return (
    <div className="grid grid-cols-30 gap-1">
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className={`w-8 h-8 border border-gray-300 ${getCellClass(cell)}`}>
              {cell === 'G1' && (
                <img
                  src={blinky} 
                  alt="Blinky"
                  className="w-full h-full flex justify-center items-center" 
                />
              )}
                            {cell === 'G3' && (
                <img
                  src={pinky} 
                  alt="pinky"
                  className="w-full h-full" 
                />
              )}
                                          {cell === 'G2' && (
                <img
                  src={inky} 
                  alt="inky"
                  className="w-full h-full" 
                />
              )}
                                                        {cell === 'G4' && (
                <img
                  src={clyde} 
                  alt="clyde"
                  className="w-full h-full" 
                />
              )}
              {cell === 'C' && (
                <div
                  className="w-full h-full flex justify-center items-center" 
                >
                  <img
                    src={dot} 
                    alt="dot"
                    style={{ width: '25%', height: '25%' }} 
                  />
                </div>
              )}
                            {cell === 'U' && (
                <div
                  className="w-full h-full flex justify-center items-center" 
                >
                  <img
                    src={dot} 
                    alt="dot"
                    style={{ width: '60%', height: '60%' }} 
                  />
                </div>
              )}
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
      return 'bg-black';      // blinky
    case 'G2':
      return 'bg-black'; // inky
    case 'G3':
      return 'bg-black'; // pinky
    case 'G4':
      return 'bg-black'; // clyde
    case 'C':
        //coins
      return 'bg-black';
    case 'U':
        //powerups
      return 'bg-black'; 
    case '.':
      return 'bg-black';
    case 'X':
      return 'bg-blue-900';
      //walls
    default:
        //empty cells
      return 'bg-gray-100'; 
  }
}

export default Pac;
