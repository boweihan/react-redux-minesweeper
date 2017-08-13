import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newGame, pauseGame, restartGame} from '../actions/board';
import {setColumns, setRows, setTotalMines} from '../actions/controls';

class Controls extends Component {
	render() {
		return (
			<div className="controls">
				<div className="controls-row">
					<label htmlFor="control-rows">Rows:</label>
					<input
						id="control-rows"
						type="text"
						value={this.props.controlRows}
						onChange={this.onRowsChange.bind(this)}
					/>
					<input
						id="control-columns"
						type="text"
						value={this.props.controlCols}
						onChange={this.onColumnsChange.bind(this)}
					/>
					<input
						id="control-mines"
						type="text"
						value={this.props.controlMines}
						onChange={this.onMinesChange.bind(this)}
					/>
				</div>
				<div className="controls row">
					<button type="button" onClick={() => this.props.pauseGame()}>Pause Game</button>
					<button type="button" onClick={this.newGame.bind(this)}>New Game</button>
					<button type="button" onClick={this.restartGame.bind(this)}>Restart Game</button>
				</div>
			</div>
		);
	}

	newGame() {
		this.props.newGame(this.props.controlRows, this.props.controlCols, this.props.controlMines);
	}

	restartGame() {
		this.props.restartGame();
		// Reset controls to previous game values
		this.props.setRows(this.props.actualRows);
		this.props.setColumns(this.props.actualCols);
		this.props.setTotalMines(this.props.actualMines);
	}

	componentWillMount() {
		this.newGame();
	}

	onRowsChange(evt) {
		const valueNum = +evt.target.value;
		if (!isNaN(valueNum)) {
			this.props.setRows(valueNum);
		} else {
			// TODO: handle bad input
		}
	}

	onColumnsChange(evt) {
		const valueNum = +evt.target.value;
		if (!isNaN(valueNum)) {
			this.props.setColumns(valueNum);
		} else {
			// TODO: handle bad input
		}
	}

	onMinesChange(evt) {
		const valueNum = +evt.target.value;
		if (!isNaN(valueNum)) {
			this.props.setTotalMines(valueNum);
		} else {
			// TODO: handle bad input
		}
	}

}


const mapStateToProps = state => ({
	controlRows: state.controls.rows,
	controlCols: state.controls.columns,
	controlMines: state.controls.mines,
	actualRows: state.board.numRows,
	actualCols: state.board.numCols,
	actualMines: state.board.numMines,
});


export default connect(
	mapStateToProps,
	{
		newGame,
		restartGame,
		pauseGame,
		setRows,
		setColumns,
		setTotalMines
	}
)(Controls);