export const gameWonMapper = (state, action) => {
	return {
		...state,
		isFinished: true,
		lastGameLost: false
	};
};