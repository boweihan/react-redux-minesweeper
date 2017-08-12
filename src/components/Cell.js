import React, {Component} from 'react';

class Cell extends Component {
	render() {
		return (
			<div
				className="cell"
				data-cell={this.props.cellId}>
				{this.props.code}
			</div>
		);
	}
}

export default Cell;