import React from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';
import { Progress } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';

export interface ICountryStatsProps {
    country: any;
    questionId: number;
    dimension: string;
}

const CountryStats = ({ country, questionId, dimension }: ICountryStatsProps) => (
  <div>
      <h1>{country.Name}</h1>
      <h3>Happiness score</h3>
      <h2>{country[DIMENSION_NAMES.LIFE_LADDER] }</h2>
      <Progress
        value={country[DIMENSION_NAMES.LIFE_LADDER]}
        total={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX}
        color='blue' />
      <h3>compared to world average</h3>
      <Progress
        value={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].AVERAGE}
        total={DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX}
        color='blue' /> 

      {
        questionId !== 0 &&
        <div>
          <h3>{ dimension } score</h3>
          <Progress
            value={country[dimension]}
            total={DIMENSIONS_MAP[dimension].MAX}
            color='orange' />
          <h3>compared to world average</h3>
          <Progress
            value={DIMENSIONS_MAP[dimension].AVERAGE}
            total={DIMENSIONS_MAP[dimension].MAX}
            color='orange' />
        </div>
      }
  </div>
)

const mapStateToProps = (state: { data: ICountryState }) => ({
  country: state.data.countries.filter((c: any) => {
      return c.Name === state.data.country
  })[0],
  questionId: state.data.questionId,
  dimension: state.data.dimensions[state.data.questionId]
});

export default connect(mapStateToProps, {})(CountryStats);