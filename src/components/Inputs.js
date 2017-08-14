import React from 'react';

const Inputs = props => (
	<div className="controls-row">

		<label htmlFor="control-rows">Rows:</label>
		<input
			id="control-rows"
			type="number"
			min={props.minRows}
			max={props.maxRows}
			value={props.rows}
			onChange={evt => props.onRowsChange(+evt.target.value)}
		/>

		<label htmlFor="control-columns">Columns:</label>
		<input
			id="control-columns"
			type="number"
			min={props.minCols}
			max={props.maxCols}
			value={props.cols}
			onChange={evt => props.onColumnsChange(+evt.target.value)}
		/>

		<label htmlFor="control-mines">Mines:</label>
		<input
			id="control-mines"
			type="number"
			min={props.minMines}
			max={props.maxMines}
			value={props.mines}
			onChange={evt => props.onMinesChange(+evt.target.value)}
		/>

	</div>
);

export default Inputs;