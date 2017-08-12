import React, {Component} from 'react';
import {connect} from 'react-redux';
import Controls from './Controls';
import Board from './Board';
import {newGame} from '../actions/controls';

class Game extends Component {
	render() {
		return (
			<div className="game">
				<Controls/>
				<Board board={this.props.board} />
			</div>
		);
	}

	componentWillMount() {
		const {numRows, numCols, numMines} = this.props;
		this.props.newGame(numRows, numCols, numMines);
	}
}


const mapStateToProps = state => {
	const {numRows, numCols, numMines} = state.controls;
	const board = state.board;
	return {numRows, numCols, numMines, board};
};


export default connect(
	mapStateToProps,
	{newGame}
)(Game);