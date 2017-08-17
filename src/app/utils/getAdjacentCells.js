export function getAdjacentCells(cellId, numRows, numCols) {

	const row = Math.floor(cellId / numCols);
	const size = numRows * numCols;

	// get cells to left and right, filter out any not in the same row
	let adjacent = [cellId - 1, cellId, cellId + 1]
		.filter(id => Math.floor(id / numCols) === row);

	// add row above and below
	adjacent = [
		...adjacent.map(v => v - numCols),
		...adjacent,
		...adjacent.map(v => v + numCols)
	];

	// filter out out-of-range cells
	return adjacent
		.filter(cellId => cellId >=0 && cellId < size);

}