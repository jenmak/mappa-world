import React from 'react';
import CountryStats from './components/country-stats';
import CountryDropdown from './components/country-dropdown';
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

  render () {
    return (
      <div>
        <HappinessHeader />
        <Grid columns={2} padded>
          <Grid.Column mobile={16} tablet={16} computer={10} color='blue'>
            <QuestionFlipper />
            <GlobeContainer />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={6} color='teal'>
            <CountryDropdown />
          </Grid.Column>
        </Grid>
        {/* <CountryStats
          name={this.state.selectedCountry}
          stats={this.state.countryStats}
          sizeFactor={this.state.sizeFactor}
        /> */}
      </div>
    );
  }
}

export default App;
