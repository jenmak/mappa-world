import React from 'react';
// import logo from './logo.svg';
import sketch from './sketches/sketch.ts';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
// import { DIMENSIONS_MAP } from '/sketch';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedCountry: 'United States of America',
        year: 2018,
        sizeFactor: 'Life Ladder'
    }
  }

  pressEvent(){
		this.state.sizeFactor === 'Life Ladder' ? this.setState({sizeFactor: 'Perceptions of corruption'}) : this.setState({sizeFactor:'Life Ladder'});
	}

  render () {
    return (
      <div>
        {/* TODO: select a country */}
        <P5Wrapper
            sketch={sketch}
            selectedCountry={this.state.selectedCountry}
            year={this.state.year}
            sizeFactor={this.state.sizeFactor}
            />
        <h1>{this.state.selectedCountry}</h1>
        <select>
          {/* <option */}
        </select>
        <button onClick={this.pressEvent.bind(this)}>{ this.state.sizeFactor }</button>
      </div>
    );
  }
}

export default App;
