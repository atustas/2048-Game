// src/App.tsx
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { initializeBoard, moveLeft, moveRight, moveUp, moveDown, Board as GameBoard } from './game/game';

const App: React.FC = () => {
  const [board, setBoard] = useState<GameBoard>(initializeBoard);

  const handleKeyDown = (event: KeyboardEvent) => {
    let newBoard: GameBoard;
    switch (event.key) {
      case 'ArrowLeft':
        newBoard = moveLeft(board);
        break;
      case 'ArrowRight':
        newBoard = moveRight(board);
        break;
      case 'ArrowUp':
        newBoard = moveUp(board);
        break;
      case 'ArrowDown':
        newBoard = moveDown(board);
        break;
      default:
        return;
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  return (
    <div className="App">
      <h1>2048 Game</h1>
      <Board board={board} />
    </div>
  );
};

export default App;
