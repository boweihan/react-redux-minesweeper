import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {newGame} from '../actions/controls';
import {cellReveal, markAsMine, hitMine} from '../actions/board';
import {UNCLEARED_MINE, UNCLEARED_SAFE} from '../utils/codes';

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
		const {numRows, numCols, numMines} = this.props;
		this.props.newGame(numRows, numCols, numMines);
	}

	onCellClick(cellId, isLeftClick) {
		if (isLeftClick) {
			const cellCode = this.props.board[cellId];
			switch (cellCode) {
				case UNCLEARED_SAFE:
					this.props.cellReveal(cellId);
					break;
				case UNCLEARED_MINE:
					this.props.hitMine(cellId);
					break;
				default:
					break;
			}
		} else {
			this.props.markAsMine(cellId);
		}
	}
}


const mapStateToProps = state => {
	const {numRows, numCols, numMines} = state.controls;
	const board = state.board.board;
	return {numRows, numCols, numMines, board};
};


export default connect(
	mapStateToProps,
	{
		newGame,
		cellReveal,
		markAsMine,
		hitMine
	}
)(Game);