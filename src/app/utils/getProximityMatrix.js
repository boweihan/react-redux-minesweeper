import {matrix} from './matrix';
import {subMatrix} from './subMatrix';
import {getSubBoard} from './getSubBoard';
import {toMatrix} from './toMatrix';
import {PROXIMITY_IS_MINE, MINE_STATE_MINE} from '../constants';
import {flatten} from './flatten';

export function getProximityMatrix(mines, numRows, numCols) {
	const proximityCounts = matrix(PROXIMITY_IS_MINE, numRows, numCols);
	const minesMatrix = toMatrix(mines, numCols);

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			if (minesMatrix[row][col] === MINE_STATE_MINE) {
				// Skip cells that are mines - they can't have any proximity counts
				continue;
			}
			const {startRow, endRow, startCol, endCol} = getSubBoard(row, col, numRows, numCols, 1);
			const surroundingCells = subMatrix(minesMatrix, startRow, endRow, startCol, endCol);
			proximityCounts[row][col] = flatten(surroundingCells)
				.filter(status => status === MINE_STATE_MINE)
				.length;
		}
	}

	return proximityCounts;
}