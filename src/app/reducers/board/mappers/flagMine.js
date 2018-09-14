import { CELL_STATE_FLAGGED } from '../../../constants';

export const flagMineMapper = (state, action) => {
  const board = [...state.board];
  board[action.payload] = CELL_STATE_FLAGGED;
  return {
    ...state,
    board,
    minesRemaining: state.minesRemaining - 1,
  };
};
