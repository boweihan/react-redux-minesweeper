import getSubBoard from './getSubBoard';
import sequence from './sequence';
import flatten from './flatten';

export default function getAdjacentCells(cellId, numRows, numCols) {

	const row = Math.floor(cellId / numCols);
	const col = cellId % numCols;

	const subBoard = getSubBoard(row, col, numRows, numCols);
	const rows = sequence(subBoard.startRow, subBoard.endRow);
	const cols = sequence(subBoard.startCol, subBoard.endCol);

	return flatten(rows.map(row => cols.map(col => [row, col])))
		.map(cell => cell[0] * numCols + cell[1]);

}