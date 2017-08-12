import sequence from './sequence';

export default function subMatrix(matrix, startRow, endRow, startCol, endCol) {
	return sequence(startRow, endRow)
		.map(row => matrix[row].slice(startCol, endCol + 1));
}