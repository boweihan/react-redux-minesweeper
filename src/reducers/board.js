import {CELL_REVEAL, FLAG_MINE, HIT_MINE, NEW_GAME, RESTART_GAME, UNFLAG_MINE} from '../actions/board';
import getProximityMatrix from '../utils/getProximityMatrix';
import flatten from '../utils/flatten';
import {
	CELL_STATE_FLAGGED, CELL_STATE_HIT_MINE, CELL_STATE_UNCLEARED,
} from '../constants';
import generateMines from '../utils/generateMines';
import openSpace from '../utils/openSpace';
import repeat from '../utils/repeat';

const INITIAL_BOARD_STATE = {
	board: [],
	mines: [],
	proximity: [],
	numRows: 0,
	numCols: 0,
	numMines: 0,
	isPaused: false,
	isFinished: false,
	isStarted: false,
	lastGameLost: false,
	elapsedTime: 0,
	minesRemaining: 0
};


export default function board (state = INITIAL_BOARD_STATE, action) {
	let board, cellId;
	switch (action.type) {

		case NEW_GAME:
			const {rows: numRows, cols: numCols, mines: numMines} = action.payload;
			const mines = generateMines(numRows, numCols, numMines);
			board = repeat(CELL_STATE_UNCLEARED, mines.length);
			const proximity = flatten(getProximityMatrix(mines, numRows, numCols));
			return {
				...state,
				board,
				mines,
				proximity,
				numMines,
				numRows,
				numCols,
				isPaused: false,
				isFinished: false,
				isStarted: false,
				lastGameLost: false,
				elapsedTime: 0,
				minesRemaining: numMines
			};

		case RESTART_GAME:
			board = repeat(CELL_STATE_UNCLEARED, state.board.length);
			return {
				...state,
				board,
				isPaused: false,
				isFinished: false,
				isStarted: false,
				lastGameLost: false,
				elapsedTime: 0,
				minesRemaining: numMines
			};

		case CELL_REVEAL:
			return {
				...state,
				board: openSpace(
					[...state.board],
					state.mines,
					state.proximity,
					action.payload.cellId,
					state.numRows,
					state.numCols
				)
			};

		case FLAG_MINE:
			board = [...state.board];
			board[action.payload.cellId] = CELL_STATE_FLAGGED;
			return {
				...state,
				board,
				minesRemaining: state.minesRemaining - 1
			};

		case UNFLAG_MINE:
			board = [...state.board];
			cellId = action.payload;
			board[action.payload.cellId] = CELL_STATE_UNCLEARED;
			return {
				...state,
				board,
				minesRemaining: state.minesRemaining + 1
			};

		case HIT_MINE:
			board = [...state.board];
			cellId = action.payload;
			board[action.payload.cellId] = CELL_STATE_HIT_MINE;
			return {
				...state,
				isFinished: true,
				lastGameLost: true,
				board
			};

		default:
			return state;

	}
}