import React from 'react';
import CountryStats from './components/country-stats';
import CountryDropdown from './components/country-dropdown';
import GlobeContainer from './components/globe-container';
import HappinessHeader from './components/happiness-header';
import QuestionFlipper from './components/question-flipper';
import { Grid } from 'semantic-ui-react'

const App = () => (
  <div>
    <HappinessHeader />
    <Grid columns={2} padded>
      <Grid.Column mobile={16} tablet={16} computer={10} color='blue'>
        <QuestionFlipper />
        <GlobeContainer />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={6} color='teal'>
        <CountryDropdown />
        <CountryStats />
      </Grid.Column>
    </Grid>
  </div>
);

export default App;
