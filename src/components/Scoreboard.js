import React, {Component} from 'react';

class Scoreboard extends Component {
	render() {
		return (
			<div className="scoreboard">
				{this.getMessage()}
				<p>Mines remaining: {this.props.minesRemaining}</p>
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
}

export default Scoreboard;