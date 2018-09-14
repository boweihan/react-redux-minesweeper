import {
  CELL_STATE_FLAGGED,
  CELL_STATE_HIT_MINE,
  CELL_STATE_REVEAL_MINE_FOUND,
  CELL_STATE_REVEAL_MINE_UNFOUND,
  CELL_STATE_REVEAL_MINE_WRONG,
  CELL_STATE_UNCLEARED,
  MINE_STATE_MINE,
} from '../../../constants';

export const hitMineMapper = (state, action) => {
  const { mines } = state;
  const board = state.board.map((cellState, i) => {
    if (i === action.payload) {
      return CELL_STATE_HIT_MINE;
    }
    const isMine = mines[i] === MINE_STATE_MINE;
    switch (cellState) {
      case CELL_STATE_FLAGGED:
        return isMine
          ? CELL_STATE_REVEAL_MINE_FOUND
          : CELL_STATE_REVEAL_MINE_WRONG;
      case CELL_STATE_UNCLEARED:
        return isMine ? CELL_STATE_REVEAL_MINE_UNFOUND : cellState;
      default:
        return cellState;
    }
  });
  return {
    ...state,
    isFinished: true,
    lastGameLost: true,
    board,
    focusedCell: -1,
  };
};
