import React, {Component} from 'react';
import Controls from './Controls';
import Board from './Board';

class Game extends Component {
	render() {
		return (
			<div className="game">
				<Controls/>
				<Board rows={15} columns={15}/>
			</div>
		);
	}
}

export default Game;