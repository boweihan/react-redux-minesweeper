import { CELL_STATE_UNCLEARED } from '../constants';
import { getAdjacentCells } from './getAdjacentCells';
import { mapProximityCountToCellState } from './mapProximityCountToCellState';

export function openSpace(board, proximity, cellId, numRows, numCols) {
  if (proximity[cellId] !== 0) {
    board[cellId] = proximity[cellId];
    return board;
  }

  // The initial cells to check includes just the clicked cell
  const cellsToCheck = [cellId];

  // First find the region of cells surrounding the clicked cell that have no mines nearby
  // (i.e. proximity count is zero)

  const filterCellsToCheck = cellId => {
    return (
      cellsToCheck.indexOf(cellId) === -1 &&
      board[cellId] === CELL_STATE_UNCLEARED
    );
  };

  // Loop through all cells that need to be checked
  while (cellsToCheck.length > 0) {
    const cellId = cellsToCheck.shift();
    board[cellId] = mapProximityCountToCellState(0);

    const adjCells = getAdjacentCells(cellId, numRows, numCols).filter(
      filterCellsToCheck,
    );

    // Each of these adjacent cells needs to be checked if proximity count is 0
    cellsToCheck.push(...adjCells.filter(cellId => proximity[cellId] === 0));

    for (let i = 0, n = adjCells.length; i < n; i++) {
      const cellId = adjCells[i];
      board[cellId] = mapProximityCountToCellState(proximity[cellId]);
    }
  }

  return board;
}
