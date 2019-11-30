import React from 'react';
// import logo from './logo.svg';
import sketch, {DIMENSIONS_MAP} from './sketches/sketch.ts';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedCountry: 'United States of America',
        year: 2018,
        sizeFactor: 'Life Ladder'
    }
  }

  onSizeFactorChange(e) {
    this.setState({
      sizeFactor: e.target.value
    })
  }

  render () {
    return (
      <div>
        {/* TODO: select a country */}

        {/* <h1>{this.state.selectedCountry}</h1> */}

        <div className="form-group">
          <label htmlFor="select2" >Dimension</label>
          <select value={this.state.sizeFactor} onChange={this.onSizeFactorChange.bind(this)} className="form-control">
          {Object.keys(DIMENSIONS_MAP).map(option => {
            return <option value={option} key={option} >{option}</option>
          })}
        </select>
        </div>
        {/* <button onClick={this.pressEvent.bind(this)}>{ this.state.sizeFactor }</button> */}
        <P5Wrapper
            sketch={sketch}
            selectedCountry={this.state.selectedCountry}
            year={this.state.year}
            sizeFactor={this.state.sizeFactor}
            />
      </div>
    );
  }
}

export default App;
