
export const NEW_GAME = 'NEW_GAME';
export const RESTART_GAME = 'RESTART_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';


export const newGame = (numRows, numCols, numMines) => ({
	type: NEW_GAME,
	payload: {numRows, numCols, numMines}
});


export const restartGame = () => {

};


export const pauseGame = () => {

};