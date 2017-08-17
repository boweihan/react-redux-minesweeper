import {PROXIMITY_IS_MINE, MINE_STATE_MINE} from '../constants';

export function getProximity(mines, numCols) {
	const size = mines.length;

	// Map each cell to a proximity state
	return mines.map((mineState, cellId) => {
		if (mineState === MINE_STATE_MINE) {
			return PROXIMITY_IS_MINE;
		}

		// row number of current cell
		const row = Math.floor(cellId / numCols);

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
		// then map back to mines
		// then count number mines
		return adjacent
			.filter(cellId => cellId >=0 && cellId < size)
			.map(cellId => mines[cellId])
			.filter(mineState => mineState === MINE_STATE_MINE)
			.length;
	});
}