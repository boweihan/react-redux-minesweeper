import {UNCLEARED_MINE, UNCLEARED_SAFE} from './codes';

export default function generateBoard(numRows, numCols, numMines) {

	const board = new Array(numRows)
		.fill(null)
		.map(() => {
			return new Array(numCols)
				.fill(UNCLEARED_SAFE)
		});

	let minesAllocated = 0;
	while (minesAllocated < numMines) {
		const randRow = Math.floor(Math.random() * numRows);
		const randCol = Math.floor(Math.random() * numCols);

		if (board[randRow][randCol] === UNCLEARED_SAFE) {
			board[randRow][randCol] = UNCLEARED_MINE;
			minesAllocated += 1;
		}
	}

	return board;

}