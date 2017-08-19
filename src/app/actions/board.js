import {CELL_STATE_FLAGGED, CELL_STATE_UNCLEARED, MINE_STATE_MINE} from '../constants';
import {setColumns, setRows, setTotalMines} from './controls';
import {checkGameWon} from '../utils/checkGameWon';

export const FOCUS_CELL = 'FOCUS_CELL';
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


export const flagMine = (cellId, isFlagging) => {
	return (dispatch, getState) => {
		dispatch({
			type: isFlagging ? FLAG_MINE : UNFLAG_MINE,
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


export const cellClick = (cellId, isLeftClick) => {
	return (dispatch, getState) => {

		dispatch(cellFocus(cellId));

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
				dispatch(flagMine(cellId, false));
			} else {
				dispatch(flagMine(cellId, true));
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


export const cellFocus = cellId => ({
	type: FOCUS_CELL,
	payload: cellId
});

export const keyPressed = (ctrlKey, keyCode) => {
	return (dispatch, getState) => {
		const {board} = getState();
		if (ctrlKey) {
			switch (keyCode) {
				case 80:
					// p key - pause
					if (board.isStarted && !board.isFinished) {
						dispatch(pauseGame());
					}
					break;
				case 82:
					// r key - replay
					dispatch(replayGame());
					break;
				case 78:
					// n key - new game
					dispatch(newGame());
					break;
				default:
					break;
			}
		} else if (!board.isPaused && !board.isFinished) {
			const {focusedCell, numCols, numRows} = board;
			const row = Math.floor(focusedCell / numCols);
			let nextCell;
			switch (keyCode) {
				case 37:
					// left arrow
					nextCell = focusedCell - 1;
					if (Math.floor(nextCell / numCols) !== row) {
						nextCell += numCols;
					}
					dispatch(cellFocus(nextCell));
					break;
				case 38:
					// up arrow
					nextCell = focusedCell - numCols;
					if (nextCell < 0) {
						nextCell += numCols * numRows;
					}
					dispatch(cellFocus(nextCell));
					break;
				case 39:
					// right arrow
					nextCell = focusedCell + 1;
					if (Math.floor(nextCell / numCols) !== row) {
						nextCell -= numCols;
					}
					dispatch(cellFocus(nextCell));
					break;
				case 40:
					// down arrow
					nextCell = focusedCell + numCols;
					if (nextCell >= numCols * numRows) {
						nextCell %= numCols;
					}
					dispatch(cellFocus(nextCell));
					break;
				case 13:
					// enter key
					dispatch(cellClick(focusedCell, true));
					break;
				case 70:
					// f key - flag/unflag
					dispatch(cellClick(focusedCell, false));
					break;
				default:
					break;
			}
		}
	};
};