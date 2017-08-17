import {CELL_STATE_HIT_MINE} from '../../../constants';

export const hitMineMapper = (state, action) => {
	const board = [...state.board];
	board[action.payload] = CELL_STATE_HIT_MINE;
	return {
		...state,
		isFinished: true,
		lastGameLost: true,
		board
	};
};