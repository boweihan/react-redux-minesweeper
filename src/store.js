import {combineReducers, createStore} from 'redux';
import boardReducer from './reducers/board';

const reducers = combineReducers({
	board: boardReducer
});

export default createStore(reducers);