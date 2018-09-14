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

export function mapProximityCountToCellState(count) {
  switch (count) {
    case 0:
      return CELL_STATE_0;
    case 1:
      return CELL_STATE_1;
    case 2:
      return CELL_STATE_2;
    case 3:
      return CELL_STATE_3;
    case 4:
      return CELL_STATE_4;
    case 5:
      return CELL_STATE_5;
    case 6:
      return CELL_STATE_6;
    case 7:
      return CELL_STATE_7;
    case 8:
    default:
      return CELL_STATE_8;
  }
}
