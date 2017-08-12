import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newGame} from '../actions/controls';

class Controls extends Component {
	render() {
		return (
			<div className="controls">
				<button type="button" onClick={this.newGame.bind(this)}>New Game</button>
			</div>
		);
	}
	newGame() {
		// this.props.newGame();
	}
}


const mapStateToProps = state => ({});


export default connect(
	mapStateToProps,
	{newGame}
)(Controls);