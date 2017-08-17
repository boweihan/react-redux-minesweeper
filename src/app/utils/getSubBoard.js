export function getSubBoard(row, col, numRows, numCols, size = 1) {
	return {
		startRow: Math.max(0, row - size),
		endRow: Math.min(row + size, numRows - 1),
		startCol: Math.max(0, col - size),
		endCol: Math.min(col + size, numCols - 1)
	};
}