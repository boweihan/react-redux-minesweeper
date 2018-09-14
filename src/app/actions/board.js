import {
  CELL_STATE_FLAGGED,
  CELL_STATE_UNCLEARED,
  MINE_STATE_MINE,
} from '../constants';
import {
  closeHelpModal,
  openHelpModal,
  setColumns,
  setRows,
  setTotalMines,
} from './controls';
import { checkGameWon } from '../utils/checkGameWon';

// board actions
export const FOCUS_CELL = 'FOCUS_CELL';
export const REVEAL_CELL = 'REVEAL_CELL';
export const FLAG_MINE = 'FLAG_MINE';
export const UNFLAG_MINE = 'UNFLAG_MINE';
export const HIT_MINE = 'HIT_MINE';

// game actions
export const NEW_GAME = 'NEW_GAME';
export const START_GAME = 'START_GAME';
export const REPLAY_GAME = 'REPLAY_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const GAME_WON = 'GAME_WON';

// timer actions
export const UPDATE_TIMER = 'UPDATE_TIMER';

export const focusCell = cellId => ({
  type: FOCUS_CELL,
  payload: cellId,
});

export const revealCell = cellId => {
  return (dispatch, getState) => {
    dispatch({
      type: REVEAL_CELL,
      payload: cellId,
    });

    const { board } = getState();

    // If number of remaining uncleared cells is equal to mines remaining, game is won
    if (
      board.board.filter(code => code === CELL_STATE_UNCLEARED).length ===
      board.minesRemaining
    ) {
      dispatch(gameWon());
    }
  };
};

export const flagMine = (cellId, isFlagging) => {
  return (dispatch, getState) => {
    dispatch({
      type: isFlagging ? FLAG_MINE : UNFLAG_MINE,
      payload: cellId,
    });

    const { board } = getState();
    const { mines, minesRemaining, numMines } = board;

    if (minesRemaining === 0 && checkGameWon(mines, numMines, board.board)) {
      dispatch(gameWon());
    }
  };
};

export const hitMine = cellId => ({
  type: HIT_MINE,
  payload: cellId,
});

export const cellClick = (cellId, isLeftClick) => {
  return (dispatch, getState) => {
    dispatch(focusCell(cellId));

    let state = getState();

    if (!state.board.isStarted) {
      dispatch({
        type: START_GAME,
        payload: cellId,
      });
      state = getState();
    }

    const cellState = state.board.board[cellId];

    if (isLeftClick) {
      if (cellState === CELL_STATE_UNCLEARED) {
        const isMine = state.board.mines[cellId] === MINE_STATE_MINE;
        if (isMine) {
          dispatch(hitMine(cellId));
        } else {
          dispatch(revealCell(cellId));
        }
      }
    } else {
      if (cellState === CELL_STATE_FLAGGED) {
        dispatch(flagMine(cellId, false));
      } else if (cellState === CELL_STATE_UNCLEARED) {
        dispatch(flagMine(cellId, true));
      }
    }
  };
};

export const newGame = () => {
  return (dispatch, getState) => {
    const { controls } = getState();
    const { rows, cols, mines } = controls;
    dispatch({
      type: NEW_GAME,
      payload: { rows, cols, mines },
    });
  };
};

export const replayGame = () => {
  return (dispatch, getState) => {
    dispatch({
      type: REPLAY_GAME,
    });
    const { board } = getState();
    dispatch(setRows(board.numRows));
    dispatch(setColumns(board.numCols));
    dispatch(setTotalMines(board.numMines));
  };
};

export const pauseGame = () => ({
  type: PAUSE_GAME,
});

export const gameWon = () => ({
  type: GAME_WON,
});

export const updateTimer = () => ({
  type: UPDATE_TIMER,
  payload: new Date().getTime(),
});

export const keyPressed = (shiftKey, keyCode) => {
  return (dispatch, getState) => {
    const { board, controls } = getState();
    if (shiftKey) {
      switch (keyCode) {
        case 80:
          // Ctrl + P - pause
          if (board.isStarted && !board.isFinished) {
            dispatch(pauseGame());
          }
          break;
        case 82:
          // Ctrl + R - replay
          dispatch(replayGame());
          break;
        case 78:
          // Ctrl + N - new game
          dispatch(newGame());
          break;
        case 72:
          // Ctrl + H - help
          dispatch(
            controls.isHelpModalOpen ? closeHelpModal() : openHelpModal(),
          );
          break;
        default:
          break;
      }
    } else if (!board.isPaused && !board.isFinished) {
      const { focusedCell, numCols, numRows } = board;
      const row = Math.floor(focusedCell / numCols);
      let nextCell;
      switch (keyCode) {
        case 37:
          // left arrow
          nextCell = focusedCell - 1;
          if (Math.floor(nextCell / numCols) !== row) {
            nextCell += numCols;
          }
          dispatch(focusCell(nextCell));
          break;
        case 38:
          // up arrow
          nextCell = focusedCell - numCols;
          if (nextCell < 0) {
            nextCell += numCols * numRows;
          }
          dispatch(focusCell(nextCell));
          break;
        case 39:
          // right arrow
          nextCell = focusedCell + 1;
          if (Math.floor(nextCell / numCols) !== row) {
            nextCell -= numCols;
          }
          dispatch(focusCell(nextCell));
          break;
        case 40:
          // down arrow
          nextCell = focusedCell + numCols;
          if (nextCell >= numCols * numRows) {
            nextCell %= numCols;
          }
          dispatch(focusCell(nextCell));
          break;
        case 13:
        case 82:
          // Enter or R - reveal
          dispatch(cellClick(focusedCell, true));
          break;
        case 70:
          // F - flag/unflag
          dispatch(cellClick(focusedCell, false));
          break;
        default:
          break;
      }
    }
  };
};
