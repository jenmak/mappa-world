import React from 'react';
import countries from './data/countries.json';
import CountryStats from './components/country-stats';
import GlobeContainer from './components/globe-container';
import HappinessHeader from './components/happiness-header';
import QuestionFlipper from './components/question-flipper';
import { Grid } from 'semantic-ui-react'
import {DIMENSIONS_MAP } from './constants/dimensions';

class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
    // this.onCountryChange = this.onCountryChange.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ countryStats: this.state.countries[this.state.year].filter((c: any) => {
  //     return c.Name === this.state.selectedCountry;
  //   })[0] });
  // }

  // onCountryChange(e: any, d: any) {
  //   this.setState({
  //     selectedCountry: d.value,
  //     countryStats: this.state.countries[this.state.year].filter((c: any) => {
  //       return c.Name === d.value
  //     })[0]
  //   });
  // }

  // dropdownOptions() {
  //   let options: any[] = [];
  //   this.state.countries[this.state.year].forEach((c: any) => {
  //     options.push({
  //       text: c.Name,
  //       value: c.Name
  //     })
  //   })
  //   return options;
  // }

  render () {
    return (
      <div>
        <HappinessHeader />
        <Grid columns={2} stackable padded>
          <Grid.Column color='blue'>
            <QuestionFlipper />
            <GlobeContainer />
          </Grid.Column>
          <Grid.Column color='teal'>
            bar
          </Grid.Column>
        </Grid>

        {/* <CountryStats
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
        /> */}
      </div>
    );
  }
}

export default App;
