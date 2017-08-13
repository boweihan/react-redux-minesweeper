export const SET_ROWS = 'SET_ROWS';
export const SET_COLS = 'SET_COLS';
export const SET_TOTAL_MINES = 'SET_TOTAL_MINES';


export const setRows = rows => ({
	type: SET_ROWS,
	payload: rows
});


export const setColumns = cols => ({
	type: SET_COLS,
	payload: cols
});


export const setTotalMines = total => ({
	type: SET_TOTAL_MINES,
	payload: total
});