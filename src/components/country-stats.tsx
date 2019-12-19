import React from 'react';
import { DIMENSIONS_MAP } from '../constants/dimensions';
// import { Progress, Sidebar, Header, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';

export interface ICountryStatsProps {
  country: any;
  countries: any[];
  isSidebarVisible: boolean;
  dimension: string;
  actions: any;
}

export interface ICountryStatsState {
  showAll: boolean;
}
class CountryStats extends React.Component<ICountryStatsProps, ICountryStatsState> {
  constructor(props: ICountryStatsProps) {
    super(props);
    this.state = {
      showAll: false
    }
  }

  render() {
    const { actions, country, countries, dimension, isSidebarVisible } = this.props;
    let { showAll } = this.state;
    return (
      <div> foo </div>
    // <Sidebar
    //   as={Grid}
    //   animation='overlay'
    //   icon='labeled'
    //   direction='right'
    //   onHide={actions.toggleSidebar}
    //   visible={isSidebarVisible}
    //   width='wide'
    // >
    //   <Grid.Row>
    //     <Grid.Column width={6}></Grid.Column>
    //     <Grid.Column width={10}>
    //       <Header size='tiny'>
    //       {
    //         DIMENSIONS_MAP[dimension].IS_BOOLEAN ?
    //           '% of citizens that answered yes' :
    //           DIMENSIONS_MAP[dimension].UNITS
    //       }
    //       </Header>
    //     </Grid.Column>
    //   </Grid.Row>
    // {
    //   countries.map((co: any, i: number) => {
    //     return (i < 25 || showAll) && <Grid.Row key={i} onClick={() => actions.setCurrentCountry(co.Name)}>
    //         <Grid.Column width={6}>
    //           {i+1}. {co.Name}
    //         </Grid.Column>
    //         <Grid.Column width={10}>
    //           <Progress
    //             value={Math.round(co[dimension]*100)/100}
    //             total={DIMENSIONS_MAP[dimension].MAX}
    //             size='small'
    //             progress={ DIMENSIONS_MAP[dimension].IS_BOOLEAN ? 'percent' : 'value' }
    //             color={co.Name === country ? 'purple' : 'violet'} />
    //         </Grid.Column>
    //     </Grid.Row>
    //   })
    // }
    // {
    //   !showAll &&
    //   <Grid.Row>
    //     <Button onClick={() => this.setState({ showAll: !showAll })}>Show all</Button>
    //   </Grid.Row>
    // }
    // </Sidebar>
    )
  }
}


const mapStateToProps = (state: { data: ICountryState }) => ({
  country: state.data.country,
  countries: state.data.countries.sort((a: any, b: any) =>
    (b[state.data.dimensions[state.data.questionId]] - a[state.data.dimensions[state.data.questionId]])
  ),
  dimension: state.data.dimensions[state.data.questionId],
  isSidebarVisible: state.data.isSidebarVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryStats);