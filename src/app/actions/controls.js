import { pauseGame } from './board';

export const SET_ROWS = 'SET_ROWS';
export const SET_COLS = 'SET_COLS';
export const SET_TOTAL_MINES = 'SET_TOTAL_MINES';
export const OPEN_HELP_MODAL = 'OPEN_HELP_MODAL';
export const CLOSE_HELP_MODAL = 'CLOSE_HELP_MODAL';

export const setRows = rows => ({
  type: SET_ROWS,
  payload: rows,
});

export const setColumns = cols => ({
  type: SET_COLS,
  payload: cols,
});

export const setTotalMines = total => ({
  type: SET_TOTAL_MINES,
  payload: total,
});

export const openHelpModal = () => {
  return (dispatch, getState) => {
    const { board } = getState();
    if (board.isStarted && !board.isFinished && !board.isPaused) {
      dispatch(pauseGame());
    }
    dispatch({
      type: OPEN_HELP_MODAL,
    });
  };
};

export const closeHelpModal = () => {
  return (dispatch, getState) => {
    const { board } = getState();
    if (board.isPaused) {
      dispatch(pauseGame());
    }
    dispatch({
      type: CLOSE_HELP_MODAL,
    });
  };
};
