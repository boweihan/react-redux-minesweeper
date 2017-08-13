import {} from '../constants';
import {MINE_STATE_CLEAR, MINE_STATE_MINE} from '../constants';

export default function generateMines(numRows, numCols, numMines) {

	const numCells = numRows * numCols;
	const mines = new Array(numCells)
		.fill(MINE_STATE_CLEAR);

	let minesAllocated = 0;
	while (minesAllocated < numMines) {
		const randRow = Math.floor(Math.random() * numRows);
		const randCol = Math.floor(Math.random() * numCols);
		const index = randRow * numCols + randCol;

		if (mines[index] === MINE_STATE_CLEAR) {
			mines[index] = MINE_STATE_MINE;
			minesAllocated += 1;
		}
	}

	return mines;

}