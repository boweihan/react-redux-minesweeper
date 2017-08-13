import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {cellClicked, updateTimer} from '../actions/board';
import Scoreboard from './Scoreboard';

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
				<Controls/>
				<Scoreboard {...this.props} />
				<Board
					{...this.props}
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
		this.props.cellClicked(cellId, isLeftClick);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isPaused !== this.props.isPaused) {
			if (nextProps.isPaused) {
				this.cancelTimer();
			} else {
				this.resumeTimer();
			}
		}
		else if (nextProps.isFinished !== this.props.isFinished) {
			if (nextProps.isFinished) {
				this.cancelTimer();
			}
		}
		else if (nextProps.isStarted !== this.props.isStarted) {
			if (nextProps.isStarted) {
				this.resumeTimer();
			}
		}
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
	return {...state.board};
};


export default connect(
	mapStateToProps,
	{
		updateTimer,
		cellClicked
	}
)(Game);