import {CELL_STATE_FLAGGED, CELL_STATE_UNCLEARED, MINE_STATE_MINE} from '../constants';
import {setColumns, setRows, setTotalMines} from './controls';
import {checkGameWon} from '../utils/checkGameWon';


export const CELL_REVEAL = 'CELL_REVEAL';
export const FLAG_MINE= 'FLAG_MINE';
export const UNFLAG_MINE= 'UNFLAG_MINE';
export const HIT_MINE = 'HIT_MINE';

export const NEW_GAME = 'NEW_GAME';
export const START_GAME = 'START_GAME';
export const REPLAY_GAME = 'REPLAY_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const GAME_WON = 'GAME_WON';

export const UPDATE_TIMER = 'UPDATE_TIMER';


export const cellReveal = cellId => {
	return (dispatch, getState) => {
		dispatch({
			type: CELL_REVEAL,
			payload: cellId
		});

		const {board} = getState();

		// If number of remaining uncleared cells is equal to mines remaining, game is won
		if (board.board.filter(code => code === CELL_STATE_UNCLEARED).length === board.minesRemaining) {
			dispatch(gameWon());
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
		const {mines, minesRemaining, numMines} = board;

		if (minesRemaining === 0 && checkGameWon(mines, numMines, board.board)) {
			dispatch(gameWon());
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
		const {mines, minesRemaining, numMines} = board;

		if (minesRemaining === 0 && checkGameWon(mines, numMines, board.board)) {
			dispatch(gameWon());
		}
	};
};


export const hitMine = cellId => ({
	type: HIT_MINE,
	payload: cellId
});


export const cellClicked = (cellId, isLeftClick) => {
	return (dispatch, getState) => {
		let state = getState();

		if (!state.board.isStarted) {
			dispatch({
				type: START_GAME,
				payload: cellId
			});
			state = getState();
		}

		const cellCode = state.board.board[cellId];

		if (isLeftClick) {
			if (cellCode === CELL_STATE_UNCLEARED) {
				const isMine = state.board.mines[cellId] === MINE_STATE_MINE;
				if (isMine) {
					dispatch(hitMine(cellId));
				} else {
					dispatch(cellReveal(cellId));
				}
			}
		} else {
			if (cellCode === CELL_STATE_FLAGGED) {
				dispatch(unflagMine(cellId));
			} else {
				dispatch(flagMine(cellId));
			}
		}

	};
};


export const newGame = () => {
	return (dispatch, getState) => {
		const {controls} = getState();
		const {rows, cols, mines} = controls;
		dispatch({
			type: NEW_GAME,
			payload: {rows, cols, mines}
		});
	};
};


export const replayGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: REPLAY_GAME
		});
		const {board} = getState();
		dispatch(setRows(board.numRows));
		dispatch(setColumns(board.numCols));
		dispatch(setTotalMines(board.numMines));
	};
};


export const pauseGame = () => ({
	type: PAUSE_GAME
});


export const gameWon = () => ({
	type: GAME_WON
});


export const updateTimer = () => ({
	type: UPDATE_TIMER,
	payload: (new Date()).getTime()
});