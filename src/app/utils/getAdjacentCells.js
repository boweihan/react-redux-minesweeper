export function getAdjacentCells(cellId, numRows, numCols, distance = 1) {

	const row = Math.floor(cellId / numCols);
	const size = numRows * numCols;

	// get cells to left and right, filter out any not in the same row
	let adjacent = [cellId - distance, cellId, cellId + distance]
		.filter(id => Math.floor(id / numCols) === row);

	// add row above and below
	adjacent = [
		...adjacent.map(v => v - numCols * distance),
		...adjacent,
		...adjacent.map(v => v + numCols * distance)
	];

	// filter out out-of-range cells
	// and don't include central cell
	return adjacent
		.filter(id => id >=0 && id < size && id !== cellId);

}