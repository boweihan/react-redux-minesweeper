
import {NEW_GAME} from '../actions/controls';
import generateBoard from '../utils/generateBoard';
import {CELL_REVEAL} from '../actions/board';
import clearProximity from '../utils/clearProximity';
import getProximityMatrix from '../utils/getProximityMatrix';
import flatten from '../utils/flatten';

const INITIAL_BOARD_STATE = {
	board: [],
	proximity: []
};


export default function board (state = INITIAL_BOARD_STATE, action) {
	switch (action.type) {
		case NEW_GAME:
			const {numRows, numCols, numMines} = action.payload;
			const board = generateBoard(numRows, numCols, numMines);
			const proximity = flatten(getProximityMatrix(board, numRows, numCols));
			return {board, proximity};
		case CELL_REVEAL:
			const {cellId} = action.payload;
			return clearProximity([].concat(state), cellId);
		default:
			return state;
	}
}