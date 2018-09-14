export const updateTimerMapper = (state, action) => {
  return {
    ...state,
    time: action.payload,
    elapsedTime: state.elapsedTime + (action.payload - state.time),
  };
};
