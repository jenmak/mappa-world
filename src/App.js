import React from 'react';
// import logo from './logo.svg';
import sketch from './sketches/sketch.ts';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeCountry: null,
        year: 2018,
        sizeFactor: 'Life Ladder'
    }
  }

  pressEvent(){
		this.state.sizeFactor === 'Life Ladder' ? this.setState({sizeFactor: 'Freedom to make life choices'}) : this.setState({sizeFactor:'Life Ladder'});
	}

    render () {
      return (
        <div>
          <h3>{ this.state.sizeFactor }</h3>
          <P5Wrapper
              sketch={sketch}
              activeCountry={this.state.activeCountry}
              year={this.state.year}
              sizeFactor={this.state.sizeFactor}
              />
          <button onClick={this.pressEvent.bind(this)}>Change size factor</button>
        </div>
      );
    }
}

export default App;
