import React, { Component } from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

export class HappinessHeader extends Component<{},{}> {
  render() {
    return (
      <Grid columns='1' padded>
        <Header size='large' as='h1'>
          <Image src={logo} avatar={true} />
          World Happiness Visualization
        </Header>
      </Grid>
    )
  }
}

export default HappinessHeader;