export const pauseGameMapper = (state, action) => {
  const isPaused = !state.isPaused;
  const elapsedTime = isPaused
    ? state.elapsedTime + new Date().getTime() - state.time
    : state.elapsedTime;
  const time = isPaused ? state.time : new Date().getTime();
  return {
    ...state,
    isPaused,
    time,
    elapsedTime,
  };
};
