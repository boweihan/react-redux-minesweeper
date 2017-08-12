
import {NEW_GAME} from '../actions/controls';
import generateMines from '../utils/generateBoard';

const INITIAL_BOARD_STATE = [];


export default function mines (state = INITIAL_BOARD_STATE, action) {
	console.log(state, action)
	switch (action.type) {
		case NEW_GAME:
			const {numRows, numCols, numMines} = action.payload;
			return generateMines(numRows, numCols, numMines);
		default:
			return state;
	}
}