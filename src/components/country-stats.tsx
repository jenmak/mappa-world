import React from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';
import { Progress, Segment, Statistic } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';

export interface ICountryStatsProps {
    country: any;
    countries: any[];
    questionId: number;
    dimension: string;
}

const CountryStats = ({ country, countries, questionId, dimension }: ICountryStatsProps) => (
  <div>
    <h1>{country}</h1>
    <Statistic horizontal label='Happiness' value={`${Math.round(country[DIMENSION_NAMES.LIFE_LADDER]*100)/100}/10`} />
    <Segment.Group>
      {
        countries.map((co: any, i: number) => {
          return <Segment key={i}>
            <Progress
              value={co[dimension]}
              total={DIMENSIONS_MAP[dimension].MAX}
              size='tiny'
              label={co.Name}
              color={co.Name === country ? 'purple' : 'violet'} />
            {/* <Progress
              value={DIMENSIONS_MAP[dimension].AVERAGE}
              total={DIMENSIONS_MAP[dimension].MAX}
              size='tiny'
              label='compared to world average'
              color={dimensions[questionId] === dimension ? 'purple' : 'violet'} /> */}
          </Segment>
        })
      }
    </Segment.Group>
  </div>
)

const mapStateToProps = (state: { data: ICountryState }) => ({
  country: state.data.country,
  countries: state.data.countries.sort((a: any, b: any) =>
    (b[state.data.dimensions[state.data.questionId]] - a[state.data.dimensions[state.data.questionId]])
  ),
  questionId: state.data.questionId,
  // dimensions: state.data.dimensions,
  dimension: state.data.dimensions[state.data.questionId]
});

export default connect(mapStateToProps, {})(CountryStats);