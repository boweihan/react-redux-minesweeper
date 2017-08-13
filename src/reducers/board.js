import {
	CELL_REVEAL, FLAG_MINE, HIT_MINE, NEW_GAME, PAUSE_GAME, REPLAY_GAME, START_GAME, UNFLAG_MINE,
	UPDATE_TIMER
} from '../actions/board';
import getProximityMatrix from '../utils/getProximityMatrix';
import flatten from '../utils/flatten';
import {
	CELL_STATE_FLAGGED, CELL_STATE_HIT_MINE, CELL_STATE_UNCLEARED, CELL_STATE_UNINITIALISED,
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
	time: 0,
	elapsedTime: 0,
	minesRemaining: 0
};


export default function board (state = INITIAL_BOARD_STATE, action) {
	let board, cellId;
	switch (action.type) {

		case NEW_GAME:
			const {rows: numRows, cols: numCols, mines: numMines} = action.payload;
			board = repeat(CELL_STATE_UNINITIALISED, numCols * numRows);
			return {
				...state,
				board,
				numMines,
				numRows,
				numCols,
				isPaused: false,
				isFinished: false,
				isStarted: false,
				lastGameLost: false,
				minesRemaining: numMines
			};

		case START_GAME:
			const mines = generateMines(state.numRows, state.numCols, state.numMines);
			board = repeat(CELL_STATE_UNCLEARED, mines.length);
			const proximity = flatten(getProximityMatrix(mines, state.numRows, state.numCols));
			return {
				...state,
				board,
				mines,
				proximity,
				isStarted: true,
				time: (new Date()).getTime(),
				elapsedTime: 0
			};

		case REPLAY_GAME:
			board = repeat(CELL_STATE_UNCLEARED, state.board.length);
			return {
				...state,
				board,
				isPaused: false,
				isFinished: false,
				isStarted: false,
				lastGameLost: false,
				minesRemaining: state.numMines,
				time: 0,
				elapsedTime: 0
			};

		case PAUSE_GAME:
			const isPaused = !state.isPaused;
			const elapsedTime = isPaused ?
				state.elapsedTime + (new Date()).getTime() - state.time :
				state.elapsedTime;
			const time = isPaused ?
				state.time :
				(new Date()).getTime();
			return {
				...state,
				isPaused,
				time,
				elapsedTime
			};

		case CELL_REVEAL:
			return {
				...state,
				board: openSpace(
					[...state.board],
					state.mines,
					state.proximity,
					action.payload,
					state.numRows,
					state.numCols
				)
			};

		case FLAG_MINE:
			board = [...state.board];
			board[action.payload] = CELL_STATE_FLAGGED;
			return {
				...state,
				board,
				minesRemaining: state.minesRemaining - 1
			};

		case UNFLAG_MINE:
			board = [...state.board];
			cellId = action.payload;
			board[action.payload] = CELL_STATE_UNCLEARED;
			return {
				...state,
				board,
				minesRemaining: state.minesRemaining + 1
			};

		case HIT_MINE:
			board = [...state.board];
			cellId = action.payload;
			board[action.payload] = CELL_STATE_HIT_MINE;
			return {
				...state,
				isFinished: true,
				lastGameLost: true,
				board
			};

		case UPDATE_TIMER:
			return {
				...state,
				time: action.payload,
				elapsedTime: state.elapsedTime + (action.payload - state.time)
			};

		default:
			return state;

	}
}