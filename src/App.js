import React from 'react';
// import logo from './logo.svg';
import sketch from './sketches/sketch.ts';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rotation: 150,
      stateSketch: sketch
    }
  }

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	// pressEvent(){
	// 	this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
	// }

	render () {
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
				{/* <button onClick={this.pressEvent.bind(this)}>Change Sketch</button> */}
			</div>
		);
	}
}

export default App;
