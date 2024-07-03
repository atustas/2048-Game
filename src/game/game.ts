// src/game/game.ts

export type Board = number[][];

export const initializeBoard = (): Board => {
  const board: Board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board: Board) => {
  const emptyCells: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length > 0) {
    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
};

const slide = (row: number[]) => {
  const newRow = row.filter(cell => cell !== 0); // remove all zeros
  while (newRow.length < 4) {
    newRow.push(0); // add zeros at the end
  }
  return newRow;
};

const combine = (row: number[]) => {
  for (let i = 0; i < 3; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
};

const operate = (row: number[]) => {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
};

const transpose = (board: Board) => {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
};

const reverse = (board: Board) => {
  return board.map(row => row.reverse());
};

export const moveLeft = (board: Board): Board => {
  const newBoard = board.map(row => operate(row));
  addRandomTile(newBoard);
  return newBoard;
};

export const moveRight = (board: Board): Board => {
  let newBoard = reverse(board);
  newBoard = newBoard.map(row => operate(row));
  newBoard = reverse(newBoard);
  addRandomTile(newBoard);
  return newBoard;
};

export const moveUp = (board: Board): Board => {
  let newBoard = transpose(board);
  newBoard = newBoard.map(row => operate(row));
  newBoard = transpose(newBoard);
  addRandomTile(newBoard);
  return newBoard;
};

export const moveDown = (board: Board): Board => {
  let newBoard = transpose(board);
  newBoard = reverse(newBoard);
  newBoard = newBoard.map(row => operate(row));
  newBoard = reverse(newBoard);
  newBoard = transpose(newBoard);
  addRandomTile(newBoard);
  return newBoard;
};
