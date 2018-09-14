import { openSpace } from '../../../utils/openSpace';

export const revealCellMapper = (state, action) => {
  return {
    ...state,
    board: openSpace(
      [...state.board],
      state.proximity,
      action.payload,
      state.numRows,
      state.numCols,
    ),
  };
};
