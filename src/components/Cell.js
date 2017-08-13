import React, {Component} from 'react';
import {
	CELL_STATE_0, CELL_STATE_1, CELL_STATE_2, CELL_STATE_3, CELL_STATE_4, CELL_STATE_5, CELL_STATE_6, CELL_STATE_7,
	CELL_STATE_8, CELL_STATE_FLAGGED, CELL_STATE_HIT_MINE, CELL_STATE_UNCLEARED
} from '../constants';

class Cell extends Component {
	render() {
		return (
			<div
				className={this.getClassNames()}
				data-cell={this.props.cellId}>
				{this.getContent()}
			</div>
		);
	}

	getContent() {
		switch (this.props.code) {
			case CELL_STATE_HIT_MINE:
				return <span className="mine">&#10039;</span>;
			case CELL_STATE_1:
				return 1;
			case CELL_STATE_2:
				return 2;
			case CELL_STATE_3:
				return 3;
			case CELL_STATE_4:
				return 4;
			case CELL_STATE_5:
				return 5;
			case CELL_STATE_6:
				return 6;
			case CELL_STATE_7:
				return 7;
			case CELL_STATE_8:
				return 8;
			case CELL_STATE_UNCLEARED:
			case CELL_STATE_FLAGGED:
			case CELL_STATE_0:
			default:
				return '';
		}
	}

	getClassNames() {
		const classNames = ['cell'];

		if (this.props.code === CELL_STATE_0) {
			classNames.push('close-0', 'cleared');
		} else if (this.props.code === CELL_STATE_1) {
			classNames.push('close-1', 'cleared');
		} else if (this.props.code === CELL_STATE_2) {
			classNames.push('close-2', 'cleared');
		} else if (this.props.code === CELL_STATE_3) {
			classNames.push('close-3', 'cleared');
		} else if (this.props.code === CELL_STATE_4) {
			classNames.push('close-4', 'cleared');
		} else if (this.props.code === CELL_STATE_5) {
			classNames.push('close-5', 'cleared');
		} else if (this.props.code === CELL_STATE_6) {
			classNames.push('close-6', 'cleared');
		} else if (this.props.code === CELL_STATE_7) {
			classNames.push('close-7', 'cleared');
		} else if (this.props.code === CELL_STATE_8) {
			classNames.push('close-8', 'cleared');
		} else if (this.props.code === CELL_STATE_HIT_MINE) {
			classNames.push('hit-mine');
		} else if (this.props.code === CELL_STATE_UNCLEARED) {
			classNames.push('uncleared');
		} else if (this.props.code === CELL_STATE_FLAGGED) {
			classNames.push('flagged');
		}
		return classNames.join(' ');
	}
}

export default Cell;