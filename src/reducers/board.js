import generateBoard from '../utils/generateBoard';
import {CELL_REVEAL, NEW_GAME} from '../actions/board';
import clearProximity from '../utils/clearProximity';
import getProximityMatrix from '../utils/getProximityMatrix';
import flatten from '../utils/flatten';

const INITIAL_BOARD_STATE = {
	board: [],
	numRows: 16,
	numCols: 16,
	numMines: 40,
	proximity: []
};


export default function board (state = INITIAL_BOARD_STATE, action) {
	switch (action.type) {
		case NEW_GAME:
			const {numRows, numCols, numMines} = state;
			const board = generateBoard(numRows, numCols, numMines);
			const proximity = flatten(getProximityMatrix(board, numRows, numCols));
			return {...state, board, proximity};
		case CELL_REVEAL:
			const {cellId} = action.payload;
			const updatedBoard = clearProximity(
				[].concat(state.board),
				state.proximity,
				cellId
			);
			return {...state, board: updatedBoard};
		default:
			return state;
	}
}