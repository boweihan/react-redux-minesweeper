import {repeat} from '../../../utils/repeat';
import {CELL_STATE_UNCLEARED} from '../../../constants';
import {generateMines} from '../../../utils/generateMines';
import {flatten} from '../../../utils/flatten';
import {getProximityMatrix} from '../../../utils/getProximityMatrix';

export const startGameMapper = (state, action) => {
	let mines, proximity;
	const size = state.numRows * state.numCols;
	const board = repeat(CELL_STATE_UNCLEARED, size);
	if (state.isReplay) {
		mines = state.mines;
		proximity = state.proximity;
	} else {
		mines = generateMines(state.numRows, state.numCols, state.numMines);
		proximity = flatten(getProximityMatrix(mines, state.numRows, state.numCols));
	}
	return {
		...state,
		board,
		mines,
		proximity,
		isStarted: true,
		time: (new Date()).getTime()
	};
};