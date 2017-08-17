import {repeat} from './repeat';

export function matrix(val, nRows, nCols) {
	return repeat(0, nRows)
		.map(() => repeat(val, nCols));
}