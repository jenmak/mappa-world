import React, { Component } from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';

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
                        <h3>{ stats[DIMENSION_NAMES.LIFE_LADDER] }</h3>
                        <h3>{ stats[sizeFactor] }</h3>
                    </div>
                }
            </div>
        )
    }
}

export default CountryStats;