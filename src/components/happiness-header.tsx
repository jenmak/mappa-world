import React, { Component } from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';
import { Progress } from 'semantic-ui-react'

export interface IHappinessHeaderProps {
  sizeFactor: string;
}

export class HappinessHeader extends Component<IHappinessHeaderProps,{}> {
  render() {
    const { sizeFactor } = this.props;
    return (
      <div>
        <h1>World Happiness</h1>
        <h3>{ DIMENSIONS_MAP[sizeFactor].QUESTION }</h3>

        <Progress
          value={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].AVERAGE}
          total={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX}
          progress='ratio'
          color='blue' />

        <Progress
          value={DIMENSIONS_MAP[sizeFactor].AVERAGE}
          total={DIMENSIONS_MAP[sizeFactor].MAX}
          progress='ratio'
          color='teal' />
      </div>
    )
  }
}

export default HappinessHeader;