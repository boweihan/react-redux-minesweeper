import matrix from './matrix';
import subMatrix from './subMatrix';
import getSubBoard from './getSubBoard';
import matrixSum from './matrixSum';
import toMatrix from './toMatrix';
import {PROXIMITY_IS_MINE, CELL_STATE_UNCLEARED_MINE} from './codes';

export default function getProximityMatrix(board, numRows, numCols) {
	const proximityCounts = matrix(PROXIMITY_IS_MINE, numRows, numCols);
	const boardMatrix = toMatrix(board, numCols);

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			if (boardMatrix[row][col] === CELL_STATE_UNCLEARED_MINE) {
				// Skip cells that are mines - they can't have any proximity counts
				continue;
			}
			const {startRow, endRow, startCol, endCol} = getSubBoard(row, col, numRows, numCols, 1);
			const surroundingCells = subMatrix(boardMatrix, startRow, endRow, startCol, endCol);
			proximityCounts[row][col] = matrixSum(surroundingCells);
		}
	}

	return proximityCounts;
}