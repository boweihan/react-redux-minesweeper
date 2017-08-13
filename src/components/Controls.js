import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newGame, pauseGame, replayGame} from '../actions/board';
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

					<label htmlFor="control-columns">Columns:</label>
					<input
						id="control-columns"
						type="text"
						value={this.props.controlCols}
						onChange={this.onColumnsChange.bind(this)}
					/>

					<label htmlFor="control-mines">Mines:</label>
					<input
						id="control-mines"
						type="text"
						value={this.props.controlMines}
						onChange={this.onMinesChange.bind(this)}
					/>

				</div>
				<div className="controls row">
					<button
						type="button"
						disabled={!this.props.isStarted && !this.props.isFinished}
						onClick={() => this.props.pauseGame()}>
						{this.props.isPaused ? 'Resume Game' : 'Pause Game'}
					</button>
					<button type="button" onClick={this.newGame.bind(this)}>New Game</button>
					<button type="button" onClick={this.replayGame.bind(this)}>Replay Game</button>
				</div>
			</div>
		);
	}

	newGame() {
		this.props.newGame(this.props.controlRows, this.props.controlCols, this.props.controlMines);
	}

	replayGame() {
		this.props.replayGame();
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
	isPaused: state.board.isPaused,
	isStarted: state.board.isStarted,
	isFinished: state.board.isFinished
});


export default connect(
	mapStateToProps,
	{
		newGame,
		replayGame,
		pauseGame,
		setRows,
		setColumns,
		setTotalMines
	}
)(Controls);