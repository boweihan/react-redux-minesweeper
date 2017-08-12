import {UNCLEARED_MINE, UNCLEARED_SAFE} from './codes';

export default function generateBoard(numRows, numCols, numMines) {

	const numCells = numRows * numCols;
	const board = new Array(numCells)
		.fill(UNCLEARED_SAFE);

	let minesAllocated = 0;
	while (minesAllocated < numMines) {
		const randRow = Math.floor(Math.random() * numRows);
		const randCol = Math.floor(Math.random() * numCols);
		const index = randRow * numCols + randCol;

		if (board[index] === UNCLEARED_SAFE) {
			board[index] = UNCLEARED_MINE;
			minesAllocated += 1;
		}
	}

	return board;

}