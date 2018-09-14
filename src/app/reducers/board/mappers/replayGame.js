import { repeat } from '../../../utils/repeat';
import { CELL_STATE_UNCLEARED } from '../../../constants';

export const replayGameMapper = (state, action) => {
  const board = repeat(CELL_STATE_UNCLEARED, state.board.length);
  return {
    ...state,
    gameId: state.gameId + 1,
    board,
    isPaused: false,
    isFinished: false,
    isStarted: false,
    lastGameLost: false,
    minesRemaining: state.numMines,
    elapsedTime: 0,
    isReplay: true,
    focusedCell: 0,
  };
};
