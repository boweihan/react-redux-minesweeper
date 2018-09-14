import {
  REVEAL_CELL,
  FLAG_MINE,
  FOCUS_CELL,
  GAME_WON,
  HIT_MINE,
  NEW_GAME,
  PAUSE_GAME,
  REPLAY_GAME,
  START_GAME,
  UNFLAG_MINE,
  UPDATE_TIMER,
} from '../../actions/board';
import { newGameMapper } from './mappers/newGame';
import { startGameMapper } from './mappers/startGame';
import { replayGameMapper } from './mappers/replayGame';
import { pauseGameMapper } from './mappers/pauseGame';
import { unflagMineMapper } from './mappers/unflagMine';
import { flagMineMapper } from './mappers/flagMine';
import { hitMineMapper } from './mappers/hitMine';
import { revealCellMapper } from './mappers/revealCell';
import { updateTimerMapper } from './mappers/updateTimer';
import { gameWonMapper } from './mappers/gameWon';

const INITIAL_BOARD_STATE = {
  gameId: 1,
  board: [],
  mines: [],
  proximity: [],
  numRows: 0,
  numCols: 0,
  numMines: 0,
  isPaused: false,
  isFinished: false,
  isStarted: false,
  lastGameLost: false,
  time: 0,
  elapsedTime: 0,
  minesRemaining: 0,
  isReplay: false,
  focusedCell: -1,
};

export default function board(state = INITIAL_BOARD_STATE, action) {
  switch (action.type) {
    case FOCUS_CELL:
      return { ...state, focusedCell: action.payload };

    case NEW_GAME:
      return newGameMapper(state, action);

    case START_GAME:
      return startGameMapper(state, action);

    case REPLAY_GAME:
      return replayGameMapper(state, action);

    case PAUSE_GAME:
      return pauseGameMapper(state, action);

    case REVEAL_CELL:
      return revealCellMapper(state, action);

    case FLAG_MINE:
      return flagMineMapper(state, action);

    case UNFLAG_MINE:
      return unflagMineMapper(state, action);

    case HIT_MINE:
      return hitMineMapper(state, action);

    case UPDATE_TIMER:
      return updateTimerMapper(state, action);

    case GAME_WON:
      return gameWonMapper(state, action);

    default:
      return state;
  }
}
