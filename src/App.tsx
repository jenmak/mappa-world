import React from 'react';
// import logo from './logo.svg';
import sketch from './sketches/sketch';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import countries from './data/countries.json';
import CountryStats from './components/country-stats';
import HappinessHeader from './components/happiness-header';
import { Dropdown } from 'semantic-ui-react'
import {DIMENSIONS_MAP } from './constants/dimensions';

export interface IAppState {
  countries: any;
  countryStats: any;
  selectedCountry: string;
  year: number;
  sizeFactor: string;
}

class App extends React.Component<{}, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
        countries: countries,
        countryStats: null,
        selectedCountry: 'United States of America',
        year: 2018,
        sizeFactor: 'Life Ladder'
    };
    this.onSizeFactorChange = this.onSizeFactorChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
  }

  componentDidMount() {
    this.setState({ countryStats: this.state.countries[this.state.year].filter((c: any) => {
      return c.Name === this.state.selectedCountry;
    })[0] });
  }

  onSizeFactorChange(e: any) {
    this.setState({
      sizeFactor: e.target && e.target.value
    })
  }

  onCountryChange(e: any, d: any) {
    this.setState({
      selectedCountry: d.value,
      countryStats: this.state.countries[this.state.year].filter((c: any) => {
        return c.Name === d.value
      })[0]
    });
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
        <HappinessHeader
          sizeFactor={this.state.sizeFactor}
        />
        <CountryStats
          name={this.state.selectedCountry}
          stats={this.state.countryStats}
          sizeFactor={this.state.sizeFactor}
        />
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
