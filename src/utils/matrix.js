import repeat from './repeat';

export default function matrix(val, nRows, nCols) {
	return repeat(0, nRows)
		.map(() => repeat(val, nCols));
}