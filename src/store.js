import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/board';
import controlsReducer from './reducers/controls';

const reducers = combineReducers({
	board: boardReducer,
	controls: controlsReducer
});

export default createStore(
	reducers,
	applyMiddleware(thunk)
);