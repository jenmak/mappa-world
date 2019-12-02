import React, { Component } from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';
import { Progress } from 'semantic-ui-react'

export interface ICountryStatsProps {
    name: string;
    stats: any;
    sizeFactor: string;
}

export class CountryStats extends Component<ICountryStatsProps, {}> {
    render() {
        const { name, stats, sizeFactor } = this.props;
        console.log(stats);
        return (
            <div>
                <h1>{name}</h1>
                {
                    stats && 
                    <div>
                        {/* <h3>{ stats[DIMENSION_NAMES.LIFE_LADDER] }</h3> */}
                        <Progress
                          value={stats[DIMENSION_NAMES.LIFE_LADDER]}
                          total={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX}
                          progress='ratio'
                          color='blue' />

                        <Progress
                          value={stats[sizeFactor]}
                          total={DIMENSIONS_MAP[sizeFactor].MAX}
                          progress='ratio'
                          color='teal' />
                    </div>
                }
            </div>
        )
    }
}

export default CountryStats;