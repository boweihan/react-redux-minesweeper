import React, {Component} from 'react';
import Cell from './Cell';
import {repeat} from '../utils/repeat';

class Board extends Component {
	render() {
		return (
			<div
				className="board"
				onClick={this.boardClicked.bind(this)}
				onContextMenu={this.boardClicked.bind(this)}
			>
				<div className="board-header">
					<div className={'board-header-item mines-remaining' + (this.props.isFinished && !this.props.lastGameLost ? ' success' : '')}>
						<span className="board-header-item-icon">
							<i className="zmdi zmdi-star-outline"></i>
						</span>
						<span className="board-header-item-value">{this.props.minesRemaining}</span>
					</div>
					<div className="board-header-item time-elapsed">
						<span className="board-header-item-icon">
							<i className="zmdi zmdi-timer"></i>
						</span>
						<span className="board-header-item-value">{this.getFormattedTime()}</span>
					</div>
				</div>
				{this.props.board ? this.renderGrid() : null}
			</div>
		);
	}

	renderGrid() {
		return repeat(null, this.props.numRows)
			.map((_, i) => this.renderRow(i));
	}

	renderRow(row) {
		return (
			<div className="board-row" key={'row.' + row}>
				{this.renderCells(row)}
			</div>
		);
	}

	renderCells(row) {
		return repeat(null, this.props.numCols)
			.map((_, i) => {
				const cellId = row * this.props.numCols + i;
				return <Cell
					key={'cell.' + cellId}
					cellId={cellId}
					code={this.props.board[cellId]}
				/>
			});
	}

	boardClicked(evt) {
		const {classList} = evt.target;
		if (classList.contains('cell') && !classList.contains('cell-state-cleared')) {
			const id = +evt.target.getAttribute('data-cell');
			const {button} = evt.nativeEvent;

			if (button === 0) {
				// button is 0 for left click
				this.props.onCellClick(id, true);
			}
			else if (button === 2) {
				// button is 2 for right click
				evt.preventDefault();
				this.props.onCellClick(id, false);
			}
		} else {
			evt.preventDefault();
		}
	}

	getFormattedTime() {
		const elapsedTime = Math.round(this.props.elapsedTime / 1000);
		const minutes = Math.floor(elapsedTime / 60);
		let seconds = '' + elapsedTime % 60;
		if (seconds.length === 1) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`
	}
}

export default Board;