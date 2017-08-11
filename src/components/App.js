import React, {Component} from 'react';
import Game from './Game';
import Header from './Header';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header/>
				<Game/>
			</div>
		);
	}
}

export default App;
