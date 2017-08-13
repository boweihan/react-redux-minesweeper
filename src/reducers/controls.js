
import {SET_COLS, SET_ROWS, SET_TOTAL_MINES} from '../actions/controls';

const INITIAL_CONTROLS_STATE = {
	rows: 16,
	columns: 16,
	mines: 40
};

export default function controls(state = INITIAL_CONTROLS_STATE, action) {
	switch (action.type) {
		case SET_ROWS:
			return {...state, rows: action.payload};
		case SET_COLS:
			return {...state, columns: action.payload};
		case SET_TOTAL_MINES:
			return {...state, mines: action.payload};
		default:
			return state;
	}
}