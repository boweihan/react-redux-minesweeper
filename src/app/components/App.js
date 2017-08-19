import React from 'react';
import {Provider} from 'react-redux';
import Game from './Game';
import store from '../store';

const App = () => (
	<Provider store={store}>
		<div className="app">
			<Game/>
		</div>
	</Provider>
);

export default App;
