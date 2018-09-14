import { CELL_STATE_UNCLEARED } from '../../../constants';

export const unflagMineMapper = (state, action) => {
  const board = [...state.board];
  board[action.payload] = CELL_STATE_UNCLEARED;
  return {
    ...state,
    board,
    minesRemaining: state.minesRemaining + 1,
  };
};
