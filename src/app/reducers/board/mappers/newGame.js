import { repeat } from '../../../utils/repeat';
import { CELL_STATE_UNCLEARED } from '../../../constants';

export const newGameMapper = (state, action) => {
  const { rows: numRows, cols: numCols, mines: numMines } = action.payload;
  const board = repeat(CELL_STATE_UNCLEARED, numCols * numRows);
  return {
    ...state,
    gameId: state.gameId + 1,
    board,
    numMines,
    numRows,
    numCols,
    isPaused: false,
    isFinished: false,
    isStarted: false,
    lastGameLost: false,
    minesRemaining: numMines,
    elapsedTime: 0,
    isReplay: false,
    focusedCell: 0,
  };
};
