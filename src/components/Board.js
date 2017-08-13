import React, {Component} from 'react';
import Cell from './Cell';
import repeat from '../utils/repeat';

class Board extends Component {
	render() {
		return (
			<div
				className="board"
				onClick={this.boardClicked.bind(this)}
				onContextMenu={this.boardClicked.bind(this)}
			>
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
		if (evt.target.classList.contains('cell')) {
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
		}
	}
}

export default Board;