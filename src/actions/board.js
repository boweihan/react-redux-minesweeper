import {CELL_STATE_UNCLEARED} from '../constants';

export const CELL_REVEAL = 'CELL_REVEAL';
export const FLAG_MINE= 'FLAG_MINE';
export const UNFLAG_MINE= 'UNFLAG_MINE';
export const HIT_MINE = 'HIT_MINE';

export const NEW_GAME = 'NEW_GAME';
export const RESTART_GAME = 'RESTART_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const GAME_WON = 'GAME_WON';


export const cellReveal= cellId => {
	return (dispatch, getState) => {
		dispatch({
			type: CELL_REVEAL,
			payload: cellId
		});

		const {board} = getState();

		// If number of remaining uncleared cells is equal to mines remaining, check if game won
		if (board.board.filter(code => code === CELL_STATE_UNCLEARED).length === board.minesRemaining) {
			console.log('check game won')
		}
	};
};


export const flagMine = cellId => {
	return (dispatch, getState) => {

		dispatch({
			type: FLAG_MINE,
			payload: cellId
		});

		const {board} = getState();

		console.log(board.minesRemaining)
		if (board.minesRemaining === 0) {
			console.log('check game won')
		}

	};
};


export const unflagMine = cellId => {
	return (dispatch, getState) => {

		dispatch({
			type: UNFLAG_MINE,
			payload: cellId
		});

		const {board} = getState();

		if (board.minesRemaining === 0) {
			console.log('check game won')
		}
	};
};


export const hitMine = cellId => ({
	type: HIT_MINE,
	payload: cellId
});


export const newGame = (rows, cols, mines) => ({
	type: NEW_GAME,
	payload: {rows, cols, mines}
});


export const restartGame = () => ({
	type: RESTART_GAME
});


export const pauseGame = () => ({
	type: PAUSE_GAME
});


export const gameWon = () => ({
	type: GAME_WON
});