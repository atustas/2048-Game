// src/components/Board.tsx
import React from 'react';
import './Board.css';

interface BoardProps {
  board: number[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell cell-${cell}`}>
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
