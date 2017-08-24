import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {cellClick, cellFocus, keyPressed, newGame, pauseGame, replayGame, updateTimer} from '../actions/board';
import {closeHelpModal, openHelpModal, setColumns, setRows, setTotalMines} from '../actions/controls';
import HelpModalComponent from './HelpModal';
import Header from './Header';

class Game extends Component {

	constructor(props) {
		super(props);
		this.state = {
			timer: null
		};
	}

	render() {
		return (
			<div>
				<Header
					onToggleHelp={this.toggleHelp.bind(this)}
				/>
				<div className={'game' + (this.props.board.isPaused ? ' game-paused' : '') + (this.props.board.isFinished ? ' game-finished' : '')}>
					<Controls
						{...this.props.controls}
						isStarted={this.props.board.isStarted}
						isPaused={this.props.board.isPaused}
						isFinished={this.props.board.isFinished}
						onNewGame={this.props.newGame}
						onReplayGame={this.props.replayGame}
						onPauseGame={this.props.pauseGame}
						onRowsChange={this.props.setRows}
						onColumnsChange={this.props.setColumns}
						onMinesChange={this.props.setTotalMines}
					/>
					<Board
						{...this.props.board}
						onCellClick={this.onCellClick.bind(this)}
						onCellMouseOver={this.onCellMouseOver.bind(this)}
					/>
					{this.renderHelp()}
				</div>
			</div>

		);
	}

	renderHelp() {
		return this.props.controls.isHelpModalOpen ?
			<HelpModalComponent onClose={this.props.closeHelpModal} /> :
			null;
	}

	toggleHelp() {
		if (this.props.controls.isHelpModalOpen) {
			this.props.closeHelpModal();
		} else {
			this.props.openHelpModal();
		}
	}

	onCellClick(cellId, isLeftClick) {
		if (!(this.props.board.isFinished || this.props.board.isPaused)) {
			this.props.cellClick(cellId, isLeftClick);
		}
	}

	onCellMouseOver(cellId) {
		if (!(this.props.board.isFinished || this.props.board.isPaused)) {
			this.props.cellFocus(cellId);
		}
	}

	componentDidMount() {
		document.body.onkeydown = evt => this.props.keyPressed(evt.shiftKey, evt.keyCode);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.board.gameId !== this.props.board.gameId) {
			this.cancelTimer();
		}
		else if (nextProps.board.isFinished && !this.props.board.isFinished) {
			this.cancelTimer();
		}
		else if (nextProps.board.isStarted && !this.props.board.isStarted) {
			this.resumeTimer();
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
		cellClick,
		cellFocus,
		keyPressed,
		newGame,
		replayGame,
		pauseGame,
		setRows,
		setColumns,
		setTotalMines,
		openHelpModal,
		closeHelpModal
	}
)(Game);