import {CELL_STATE_FLAGGED, CELL_STATE_REVEAL_MINE_FOUND, CELL_STATE_UNCLEARED} from '../../../constants';
import {mapProximityCountToCellState} from '../../../utils/mapProximityCountToCellState';

export const gameWonMapper = (state, action) => {
	// clear any remaining uncleared cells
	const {proximity, board} = state;
	const boardFinal = board
		.map((cellState, i) => {
			switch (cellState) {
				case CELL_STATE_UNCLEARED:
					return mapProximityCountToCellState(proximity[i]);
				case CELL_STATE_FLAGGED:
					return CELL_STATE_REVEAL_MINE_FOUND;
				default:
					return cellState;
			}
		});
	return {
		...state,
		board: boardFinal,
		isFinished: true,
		lastGameLost: false
	};
};