import {
  CELL_STATE_FLAGGED,
  CELL_STATE_UNCLEARED,
  MINE_STATE_CLEAR,
} from '../constants';

export const checkGameWon = (mines, numMines, board) => {
  // If total number of flagged & uncleared cells is total number of mines, game is won
  if (
    board.filter(
      cellState =>
        cellState === CELL_STATE_FLAGGED || cellState === CELL_STATE_UNCLEARED,
    ).length === numMines
  ) {
    return true;
  }

  // Otherwise check that none of the flags are incorrect. Remembering this function is only called
  // if number of remaining mines is 0, if no flags are incorrect then all mines have been found.
  for (let i = 0, n = mines.length; i < n; i++) {
    const cellState = board[i];
    if (mines[i] === MINE_STATE_CLEAR && cellState === CELL_STATE_FLAGGED) {
      return false;
    }
  }
  return true;
};
