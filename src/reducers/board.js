import {CELL_REVEAL, FLAG_MINE, NEW_GAME, UNFLAG_MINE} from '../actions/board';
import getProximityMatrix from '../utils/getProximityMatrix';
import flatten from '../utils/flatten';
import {
	CELL_STATE_FLAGGED,
	CELL_STATE_UNCLEARED_MINE,
	CELL_STATE_UNCLEARED_SAFE,
	MINE_STATE_CLEAR, MINE_STATE_MINE
} from '../utils/codes';
import generateMines from '../utils/generateMines';
import openSpace from '../utils/openSpace';

const INITIAL_BOARD_STATE = {
	board: [],
	mines: [],
	proximity: [],
	numRows: 16,
	numCols: 16,
	numMines: 40,
	isPaused: false,
	isFinished: false,
	isStarted: false,
	lastGameLost: false,
	elapsedTime: 0,
	minesRemaining: 40
};


export default function board (state = INITIAL_BOARD_STATE, action) {
	switch (action.type) {

		case NEW_GAME:
			const {numRows, numCols, numMines} = state;
			const mines = generateMines(numRows, numCols, numMines);
			const board = mines.map(m => m === MINE_STATE_CLEAR ? CELL_STATE_UNCLEARED_SAFE : CELL_STATE_UNCLEARED_MINE);
			const proximity = flatten(getProximityMatrix(mines, numRows, numCols));
			return {
				...state,
				board,
				mines,
				proximity,
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
			const updatedBoard = [...state.board];
			updatedBoard[action.payload.cellId] = CELL_STATE_FLAGGED;
			return {
				...state,
				board: updatedBoard,
				minesRemaining: state.minesRemaining - 1
			};

		case UNFLAG_MINE:
			const updatedBoard2 = [...state.board];
			const {cellId} = action.payload;
			const isMine = state.mines[cellId] === MINE_STATE_MINE;
			updatedBoard2[action.payload.cellId] = isMine ? CELL_STATE_UNCLEARED_MINE : CELL_STATE_UNCLEARED_SAFE;
			return {
				...state,
				board: updatedBoard2,
				minesRemaining: state.minesRemaining + 1
			};

		default:
			return state;

	}
}