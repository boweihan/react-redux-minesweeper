import {
  CELL_STATE_0,
  CELL_STATE_1,
  CELL_STATE_2,
  CELL_STATE_3,
  CELL_STATE_4,
  CELL_STATE_5,
  CELL_STATE_6,
  CELL_STATE_7,
  CELL_STATE_8,
} from '../constants';

export const isCellCleared = cellState => {
  switch (cellState) {
    case CELL_STATE_0:
    case CELL_STATE_1:
    case CELL_STATE_2:
    case CELL_STATE_3:
    case CELL_STATE_4:
    case CELL_STATE_5:
    case CELL_STATE_6:
    case CELL_STATE_7:
    case CELL_STATE_8:
      return true;
    default:
      return false;
  }
};
