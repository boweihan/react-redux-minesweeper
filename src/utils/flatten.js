export function flatten(matrix) {
	return matrix.reduce((flatArr, row) => flatArr.concat(row), []);
}