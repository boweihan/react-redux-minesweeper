import {CELL_STATE_FLAGGED, CELL_STATE_UNCLEARED, PROXIMITY_IS_MINE} from '../constants';
import {getAdjacentCells} from './getAdjacentCells';
import {mapProximityCountToCellState} from './mapProximityCountToCellState';
import {repeat} from './repeat';

export function openSpace(board, proximity, cellId, numRows, numCols) {

	const CELL_UNCHECKED = 0;
	const CELL_CHECKED = 1;

	if (proximity[cellId] !== 0) {
		board[cellId] = proximity[cellId];
		return board;
	}

	// initialise matrix corresponding to cells that have been checked
	const checkedCells = repeat(CELL_UNCHECKED, numRows * numCols);

	// The initial cells to check are those adjacent to the clicked cell
	let cellsToCheck = getAdjacentCells(cellId, numRows, numCols),
		cellsWithProxCountZero = [];

	// First find the region of cells surrounding the clicked cell that have no mines nearby
	// (i.e. proximity count is zero)

	const filterCellsToCheck = cellId => checkedCells[cellId] === CELL_UNCHECKED && cellsToCheck.indexOf(cellId) === -1;

	while (cellsToCheck.length > 0) {

		// Loop through all cells that need to be checked
		const cellId = cellsToCheck.shift();
		const cellState = board[cellId];

		// Skip cell if already cleared or flagged
		if (cellState !== CELL_STATE_UNCLEARED) {
			continue;
		}

		// Mark this cell as having been checked
		checkedCells[cellId] = CELL_CHECKED;

		// Is the proximity count zero? If not, skip to next cell.
		if (proximity[cellId] > 0) {
			continue;
		}

		cellsWithProxCountZero.push(cellId);

		// Each of these adjacent cells needs to be checked
		const adjCells =  getAdjacentCells(cellId, numRows, numCols)
			.filter(filterCellsToCheck);

		cellsToCheck = cellsToCheck.concat(adjCells);

	}

	// Now with each of cell whose proximity count is zero, reveal it and all cells around it

	for (let i = 0, n = cellsWithProxCountZero.length; i < n; i++) {

		const cellId = cellsWithProxCountZero[i];

		// Get array of adjacent cell coords (includes central cell)
		const adjCells = getAdjacentCells(cellId, numRows, numCols);

		// Reveal them all
		for (let j = 0, m = adjCells.length; j < m; j++) {
			const cellId = adjCells[j];
			const count = proximity[cellId];
			const currentState = board[cellId];
			if (count !== PROXIMITY_IS_MINE && currentState !== CELL_STATE_FLAGGED) {
				board[cellId] = mapProximityCountToCellState(proximity[cellId]);
			}
		}

	}

	return board;

}