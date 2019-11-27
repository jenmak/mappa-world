import React from 'react';
// import logo from './logo.svg';
import sketch from './sketches/sketch.ts';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
		activeCountry: 'Afghanistan',
		year: '2018'
    }
  }

	render () {
		return (
			<div>
				<P5Wrapper
					sketch={sketch}
					activeCountry={this.state.activeCountry}
					year={this.state.year}
					/>
			</div>
		);
	}
}

export default App;
