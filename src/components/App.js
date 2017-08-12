import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Game from './Game';
import Header from './Header';
import store from '../store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="app">
					<Header/>
					<Game/>
				</div>
			</Provider>
		);
	}
}

export default App;
