import React from 'react';
import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';
import { Grid, Progress, Segment, Header, Item } from 'semantic-ui-react'
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
    {/* <h1>{country}</h1> */}
    {/* <Statistic horizontal label='Happiness' value={`${Math.round(country[DIMENSION_NAMES.LIFE_LADDER]*100)/100}/10`} /> */}
    {/* <Segment.Group> */}
      {
        countries.map((co: any, i: number) => {
          return <Segment key={i}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header size='small'>{i+1}. {co.Name}</Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Progress
                    value={Math.round(co[dimension]*100)/100}
                    total={DIMENSIONS_MAP[dimension].MAX}
                    size='small'
                    progress={'value'}
                    color={co.Name === country ? 'purple' : 'violet'} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        })
      }
    {/* </Segment.Group> */}
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