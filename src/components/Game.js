import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {cellClicked, newGame, pauseGame, replayGame, updateTimer} from '../actions/board';
import Scoreboard from './Scoreboard';
import Inputs from './Inputs';
import {setColumns, setRows, setTotalMines} from '../actions/controls';

class Game extends Component {

	constructor(props) {
		super(props);
		this.state = {
			timer: null
		};
	}

	render() {
		return (
			<div className={this.getClassNames()}>
				<Inputs
					{...this.props.controls}
					onRowsChange={this.props.setRows}
					onColumnsChange={this.props.setColumns}
					onMinesChange={this.props.setTotalMines}
				/>
				<Controls
					isStarted={this.props.board.isStarted}
					isPaused={this.props.board.isPaused}
					isFinished={this.props.board.isFinished}
					onNewGame={this.props.newGame}
					onReplayGame={this.props.replayGame}
					onPauseGame={this.props.pauseGame}
				/>
				<Scoreboard {...this.props.board} />
				<Board
					{...this.props.board}
					onCellClick={this.onCellClick.bind(this)}
				/>
			</div>
		);
	}

	getClassNames() {
		const classNames = ['game'];
		if (this.props.board.isPaused) {
			classNames.push('game-paused');
		}
		if (this.props.board.isFinished) {
			classNames.push('game-finished');
		}
		return classNames.join(' ');
	}

	onCellClick(cellId, isLeftClick) {
		if (this.props.board.isFinished || this.props.board.isPaused) {
			return;
		}
		this.props.cellClicked(cellId, isLeftClick);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.board.gameId !== this.props.board.gameId) {
			this.cancelTimer();
		}
		else if (nextProps.board.isStarted && !this.props.board.isStarted) {
			this.resumeTimer();
		}
		else if (nextProps.board.isFinished && !this.props.board.isFinished) {
			this.cancelTimer();
		}
		else if (nextProps.board.isPaused !== this.props.board.isPaused) {
			if (nextProps.board.isPaused) {
				this.cancelTimer();
			} else {
				this.resumeTimer();
			}
		}
	}

	componentWillMount() {
		this.props.newGame();
	}

	resumeTimer() {
		this.setState({
			timer: setInterval(() => {
				this.props.updateTimer();
			}, 1000)
		});
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
			this.setState({
				timer: null
			});
		}
	}

}


const mapStateToProps = state => {
	return {
		board: {...state.board},
		controls: {...state.controls}
	};
};


export default connect(
	mapStateToProps,
	{
		updateTimer,
		cellClicked,
		newGame,
		replayGame,
		pauseGame,
		setRows,
		setColumns,
		setTotalMines
	}
)(Game);