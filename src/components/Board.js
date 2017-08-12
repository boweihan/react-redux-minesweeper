import React, {Component} from 'react';
import Cell from './Cell';

class Board extends Component {
	render() {
		return (
			<div className="board">
				{this.props.board ? this.renderGrid() : null}
			</div>
		);
	}

	renderGrid() {
		return this.props.board
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
		return this.props.board[row]
			.map((_, i) => (
				<Cell
					key={'cell.' + row + '.' + i}
					code={this.props.board[row][i]}
				/>
			));
	}
}

export default Board;