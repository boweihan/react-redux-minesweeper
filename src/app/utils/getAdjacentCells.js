import {sequence} from './sequence';

export function getAdjacentCells(cellId, numRows, numCols, distance = 1) {

	const row = Math.floor(cellId / numCols);
	const size = numRows * numCols
	

	const seq = sequence(-distance, distance);

	// get cells to left and right
	// filter out any not in the same row
	const adjacent = seq.filter(d => Math.floor((cellId + d) / numCols) === row);

	// add rows above and below
	// filter out out-of-range cells
	// and don't include central cell
	return adjacent
		.map(d => seq.map(v => cellId + d + numCols * v))
		.reduce((acc, v) => acc.concat(v), [])
		.filter(id => id >=0 && id < size && id !== cellId);

}