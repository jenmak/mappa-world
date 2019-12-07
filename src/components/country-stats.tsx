import React from 'react';
import { DIMENSIONS_MAP } from '../constants/dimensions';
import { Grid, Progress, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';

export interface ICountryStatsProps {
    country: any;
    countries: any[];
    dimension: string;
    actions: any;
}

const CountryStats = ({ actions, country, countries, dimension }: ICountryStatsProps) => (
    <Segment.Group raised className="countryStats">
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}></Grid.Column>
          <Grid.Column width={10}>
            <Header size='tiny'>
            {
              DIMENSIONS_MAP[dimension].IS_BOOLEAN ?
                '% of citizens that answered yes' :
                DIMENSIONS_MAP[dimension].UNITS
            }
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment className="countries">
    {
      countries.map((co: any, i: number) => {
        return <Segment vertical key={i}>
          <Grid>
            <Grid.Row onClick={() => actions.setCurrentCountry(co.Name)}>
              <Grid.Column width={6}>
                <Header size='small'>{i+1}. {co.Name}</Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <Progress
                  value={Math.round(co[dimension]*100)/100}
                  total={DIMENSIONS_MAP[dimension].MAX}
                  size='small'
                  progress={ DIMENSIONS_MAP[dimension].IS_BOOLEAN ? 'percent' : 'value' }
                  color={co.Name === country ? 'purple' : 'violet'} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      })
    }
    </Segment>
</Segment.Group>
)


const mapStateToProps = (state: { data: ICountryState }) => ({
  country: state.data.country,
  countries: state.data.countries.sort((a: any, b: any) =>
    (b[state.data.dimensions[state.data.questionId]] - a[state.data.dimensions[state.data.questionId]])
  ),
  dimension: state.data.dimensions[state.data.questionId]
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryStats);