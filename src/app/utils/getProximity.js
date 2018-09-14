import { PROXIMITY_IS_MINE, MINE_STATE_MINE } from '../constants';
import { getAdjacentCells } from './getAdjacentCells';

export function getProximity(mines, numRows, numCols) {
  // Map each cell to a proximity state
  return mines.map((mineState, cellId) => {
    if (mineState === MINE_STATE_MINE) {
      return PROXIMITY_IS_MINE;
    }
    // get adjacent cells
    // then map back to mines
    // then count number mines
    return getAdjacentCells(cellId, numRows, numCols)
      .map(cellId => mines[cellId])
      .filter(mineState => mineState === MINE_STATE_MINE).length;
  });
}
