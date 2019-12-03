import React, { Component } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

export class HappinessHeader extends Component<{},{}> {
  render() {
    return (
      <Grid verticalAlign='middle' columns={2} padded>
        <Grid.Column width={1}>
          <Image src={logo} size='tiny' />
        </Grid.Column>
        <Grid.Column width={11}>
          <Header size='large' as='h1'>World Happiness Visualization</Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HappinessHeader;