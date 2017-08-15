import {sequence} from './sequence';

export function toMatrix(values, numCols) {
	const numRows = Math.ceil(values.length / numCols);
	return sequence(0, numRows - 1)
		.map(row => values.slice(row * numCols, (row + 1) * numCols));
}