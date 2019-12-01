import React from 'react';
// import logo from './logo.svg';
import sketch, {DIMENSIONS_MAP} from './sketches/sketch';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import countries from './data/countries.json';
// import Autocomplete from './components/autocomplete.js';
import { Dropdown } from 'semantic-ui-react'

export interface IAppState {
  countries: any;
  selectedCountry: string;
  year: number;
  sizeFactor: string;
}

class App extends React.Component<{}, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
        countries: countries,
        selectedCountry: 'United States of America',
        year: 2018,
        sizeFactor: 'Life Ladder'
    };
    this.onSizeFactorChange = this.onSizeFactorChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
  }

  onSizeFactorChange(e: any) {
    this.setState({
      sizeFactor: e.target && e.target.value
    })
  }

  onCountryChange(e: any, d: any) {
    this.setState({
      selectedCountry: d.value
    })
  }

  dropdownOptions() {
    let options: any[] = [];
    this.state.countries[this.state.year].forEach((c: any) => {
      options.push({
        text: c.Name,
        value: c.Name
      })
    })
    return options;
  }

  render () {
    return (
      <div>
        <p>{this.state.selectedCountry}
        </p>
        <Dropdown
          placeholder='Select Country'
          fluid
          search
          selection
          onChange={this.onCountryChange}
          options={this.dropdownOptions()}
        />
        <div className="form-group">
          <label htmlFor="select2" >Dimension</label>
          <select value={this.state.sizeFactor} onChange={this.onSizeFactorChange} className="form-control">
          {Object.keys(DIMENSIONS_MAP).map(option => {
            return <option value={option} key={option} >{option}</option>
          })}
        </select>
        </div>
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
