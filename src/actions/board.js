
export const RESET_BOARD = 'RESET_BOARD';
export const CELL_REVEAL = 'CELL_REVEAL';
export const FLAG_MINE= 'FLAG_MINE';
export const UNFLAG_MINE= 'UNFLAG_MINE';
export const HIT_MINE = 'HIT_MINE';

export const NEW_GAME = 'NEW_GAME';
export const RESTART_GAME = 'RESTART_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';


export const resetBoard = () => ({
	type: RESET_BOARD
});


export const cellReveal= (cellId) => ({
	type: CELL_REVEAL,
	payload: {cellId}
});


export const flagMine = (cellId) => ({
	type: FLAG_MINE,
	payload: {cellId}
});


export const unflagMine = (cellId) => ({
	type: UNFLAG_MINE,
	payload: {cellId}
});


export const hitMine = (cellId) => ({
	type: HIT_MINE,
	payload: {cellId}
});


export const newGame = () => ({
	type: NEW_GAME
});


export const restartGame = () => {

};


export const pauseGame = () => {

};