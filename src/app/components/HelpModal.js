import React from 'react';

const HelpModalComponent = props => (
	<div className={'help-modal' + (props.isOpen ? ' help-modal-open' : '')}>

		<i className="zmdi zmdi-close help-modal-close-icon" onClick={props.onClose}></i>

		<h2>How To Play</h2>
		<p>The aim of the game is to locate all of the mines. Hitting a mine causes you to lose the game.</p>

		<h3>Controls - mouse</h3>
		<table>
			<tr>
				<td>Left click</td>
				<td>Reveal cell</td>
			</tr>
			<tr>
				<td>Right click</td>
				<td>Flag/unflag as mine</td>
			</tr>
		</table>


		<h3>Controls - keyboard</h3>
		<table>
			<tr>
				<td>Enter</td>
				<td>Reveal cell</td>
			</tr>
			<tr>
				<td>F</td>
				<td>Flag/unflag as mine</td>
			</tr>
			<tr>
				<td><i className="zmdi zmdi-long-arrow-up"></i></td>
				<td>Move up one row</td>
			</tr>
			<tr>
				<td><i className="zmdi zmdi-long-arrow-down"></i></td>
				<td>Move down one row</td>
			</tr>
			<tr>
				<td><i className="zmdi zmdi-long-arrow-left"></i></td>
				<td>Move left</td>
			</tr>
			<tr>
				<td><i className="zmdi zmdi-long-arrow-right"></i></td>
				<td>Move right</td>
			</tr>
			<tr>
				<td>Ctrl + P</td>
				<td>Pause game</td>
			</tr>
			<tr>
				<td>Ctrl + N</td>
				<td>New game</td>
			</tr>
			<tr>
				<td>Ctrl + R</td>
				<td>Replay game</td>
			</tr>
			<tr>
				<td>Ctrl + H</td>
				<td>Toggle help dialog</td>
			</tr>
		</table>

	</div>
);

export default HelpModalComponent;