import flatten from './flatten';

export default function matrixSum(matrix) {
	return flatten(matrix)
		.reduce((sum, val) => sum + val, 0);
}