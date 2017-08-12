import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {cellReveal, flagMine, hitMine, newGame, unflagMine} from '../actions/board';
import {CELL_STATE_FLAGGED, CELL_STATE_UNCLEARED_MINE, CELL_STATE_UNCLEARED_SAFE} from '../utils/codes';

class Game extends Component {
	render() {
		return (
			<div className="game">
				<Controls/>
				<Board
					board={this.props.board}
					numRows={this.props.numRows}
					numCols={this.props.numCols}
					onCellClick={this.onCellClick.bind(this)}
				/>
			</div>
		);
	}

	componentWillMount() {
		this.props.newGame();
	}

	onCellClick(cellId, isLeftClick) {
		const cellCode = this.props.board[cellId];

		if (isLeftClick) {
			switch (cellCode) {
				case CELL_STATE_UNCLEARED_SAFE:
					this.props.cellReveal(cellId);
					break;
				case CELL_STATE_UNCLEARED_MINE:
					this.props.hitMine(cellId);
					break;
				default:
					break;
			}
		} else {
			switch (cellCode) {
				case CELL_STATE_FLAGGED:
					this.props.unflagMine(cellId);
					break;
				default:
					this.props.flagMine(cellId);
					break;
			}
		}
	}
}


const mapStateToProps = state => {
	const {numRows, numCols, numMines, board} = state.board;
	return {numRows, numCols, numMines, board};
};


export default connect(
	mapStateToProps,
	{
		newGame,
		cellReveal,
		flagMine,
		unflagMine,
		hitMine
	}
)(Game);