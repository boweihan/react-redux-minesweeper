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

export function mapCellStateToProximityCount(cellState) {
  switch (cellState) {
    case CELL_STATE_0:
      return 0;
    case CELL_STATE_1:
      return 1;
    case CELL_STATE_2:
      return 2;
    case CELL_STATE_3:
      return 3;
    case CELL_STATE_4:
      return 4;
    case CELL_STATE_5:
      return 5;
    case CELL_STATE_6:
      return 6;
    case CELL_STATE_7:
      return 7;
    case CELL_STATE_8:
      return 8;
    default:
      return undefined;
  }
}
