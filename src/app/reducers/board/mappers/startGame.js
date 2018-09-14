import { repeat } from '../../../utils/repeat';
import { CELL_STATE_UNCLEARED } from '../../../constants';
import { generateMines } from '../../../utils/generateMines';
import { getProximity } from '../../../utils/getProximity';

export const startGameMapper = (state, action) => {
  let mines, proximity;
  const size = state.numRows * state.numCols;
  const board = repeat(CELL_STATE_UNCLEARED, size);
  if (state.isReplay) {
    mines = state.mines;
    proximity = state.proximity;
  } else {
    mines = generateMines(
      state.numRows,
      state.numCols,
      state.numMines,
      action.payload,
    );
    proximity = getProximity(mines, state.numRows, state.numCols);
  }
  return {
    ...state,
    board,
    mines,
    proximity,
    isStarted: true,
    time: new Date().getTime(),
  };
};
