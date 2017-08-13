import React, {Component} from 'react';

class Scoreboard extends Component {
	render() {
		return (
			<div className="scoreboard">
				{this.getMessage()}
				<p>Mines remaining: {this.props.minesRemaining}</p>
				<p>Time elapsed: {this.getFormattedTime()}</p>
			</div>
		);
	}

	getMessage() {
		let message = '\u0096';
		if (this.props.isFinished) {
			message = this.props.lastGameLost ? 'Game Over!' : 'You Win!';
		}
		return <h3>{message}</h3>;
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

export default Scoreboard;