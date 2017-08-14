import React from 'react';

const Controls = props => (
	<div className="controls">
		<button
			type="button"
			disabled={!props.isStarted && !props.isFinished}
			onClick={() => props.onPauseGame()}>
			{props.isPaused ? 'Resume Game' : 'Pause Game'}
		</button>
		<button type="button" onClick={props.onNewGame}>New Game</button>
		<button type="button" onClick={props.onReplayGame}>Replay Game</button>
	</div>
);

export default Controls;