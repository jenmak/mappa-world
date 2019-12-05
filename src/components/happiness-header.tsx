import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

const HappinessHeader = () => (
  <Grid columns='1' padded>
    <Header size='large' as='h1'>
      <Image src={logo} avatar={true} />
      World Happiness Visualization
    </Header>
  </Grid>
)

export default HappinessHeader;