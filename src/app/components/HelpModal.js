import React from 'react';

const HelpModalComponent = props => (
	<div className={'help-modal' + (props.isOpen ? ' help-modal-open' : '')}>

		<i className="zmdi zmdi-close help-modal-close-icon" onClick={props.onClose}></i>

		<h2>How To Play</h2>
		<p>The aim of the game is to locate all of the mines. Hitting a mine causes you to lose the game.</p>

		<h3>Controls - mouse</h3>
		<ul>
			<li>Reveal cell - left click</li>
			<li>Flag/Unflag as mine - right click</li>
		</ul>

		<h3>Controls - keyboard</h3>
		<ul>
			<li>Reveal cell - enter</li>
			<li>Flag/Unflag as mine - F</li>
			<li>Move up - up arrow</li>
			<li>Move down - down arrow</li>
			<li>Move left - left arrow</li>
			<li>Move right - right arrow</li>
			<li>Pause game - Ctrl + P</li>
			<li>Replay game - Ctrl + R</li>
			<li>New game - Ctrl + N</li>
			<li>Toggle help - Ctrl + H</li>
		</ul>

	</div>
);

export default HelpModalComponent;