import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {cellReveal, flagMine, hitMine, unflagMine} from '../actions/board';
import {CELL_STATE_FLAGGED, CELL_STATE_UNCLEARED, MINE_STATE_MINE} from '../constants';

class Game extends Component {
	render() {
		return (
			<div className={this.getClassNames()}>
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

	getClassNames() {
		const classNames = ['game'];
		if (this.props.isPaused) {
			classNames.push('game-paused');
		}
		if (this.props.isFinished) {
			classNames.push('game-finished');
		}
		return classNames.join(' ');
	}

	onCellClick(cellId, isLeftClick) {
		if (this.props.isFinished || this.props.isPaused) {
			return;
		}
		const cellCode = this.props.board[cellId];

		if (isLeftClick) {
			if (cellCode === CELL_STATE_UNCLEARED) {
				const isMine = this.props.mines[cellId] === MINE_STATE_MINE;
				if (isMine) {
					this.props.hitMine(cellId);
				} else {
					this.props.cellReveal(cellId);
				}
			}
		} else {
			if (cellCode === CELL_STATE_FLAGGED) {
				this.props.unflagMine(cellId);
			} else {
				this.props.flagMine(cellId);
			}
		}
	}
}


const mapStateToProps = state => {
	return {...state.board};
};


export default connect(
	mapStateToProps,
	{
		cellReveal,
		flagMine,
		unflagMine,
		hitMine
	}
)(Game);