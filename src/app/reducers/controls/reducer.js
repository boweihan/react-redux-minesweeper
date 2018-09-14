import {
  CLOSE_HELP_MODAL,
  OPEN_HELP_MODAL,
  SET_COLS,
  SET_ROWS,
  SET_TOTAL_MINES,
} from '../../actions/controls';

const calcMaxMines = (rows, cols) => Math.round(0.5 * rows * cols);

const INITIAL_CONTROLS_STATE = {
  rows: 10,
  cols: 10,
  mines: 10,
  minRows: 10,
  minCols: 10,
  minMines: 10,
  maxRows: 32,
  maxCols: 32,
  maxMines: calcMaxMines(32, 32),
  isHelpModalOpen: false,
};

export default function controls(state = INITIAL_CONTROLS_STATE, action) {
  switch (action.type) {
    case SET_ROWS:
      return {
        ...state,
        rows: action.payload,
        maxMines: calcMaxMines(action.payload, state.cols),
      };

    case SET_COLS:
      return {
        ...state,
        cols: action.payload,
        maxMines: calcMaxMines(state.rows, action.payload),
      };

    case SET_TOTAL_MINES:
      return { ...state, mines: action.payload };

    case OPEN_HELP_MODAL:
      return { ...state, isHelpModalOpen: true };

    case CLOSE_HELP_MODAL:
      return { ...state, isHelpModalOpen: false };

    default:
      return state;
  }
}
