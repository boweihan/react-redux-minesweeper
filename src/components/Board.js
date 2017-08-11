import React, {Component} from 'react';
import Cell from './Cell';

class Board extends Component {
	render() {
		return (
			<div className="board">
				{this.renderGrid()}
			</div>
		);
	}

	renderGrid() {
		return new Array(this.props.rows)
			.fill(0)
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
		return new Array(this.props.columns)
			.fill(0)
			.map((_, i) => <Cell key={'cell.' + row + '.' + i}/>);
	}
}

export default Board;