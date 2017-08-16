import {CELL_STATE_UNCLEARED} from '../../../constants';
import {mapProximityCountToCellState} from '../../../utils/mapProximityCountToCellState';

export const gameWonMapper = (state, action) => {
	// clear any remaining uncleared cells
	const {proximity, board} = state;
	const boardFinal = [...board]
		.map((cellState, i) => cellState === CELL_STATE_UNCLEARED ?
			mapProximityCountToCellState(proximity[i]) :
			cellState
		);
	return {
		...state,
		board: boardFinal,
		isFinished: true,
		lastGameLost: false
	};
};