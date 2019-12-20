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
      <div className="bg-white border border-solid border-white rounded fixed z-10 right-0 top-0 my-56 mx-16 w-1/3 lg:w-1/4">
        <table className="table-fixed w-full">
          <thead className="flex w-full">
            <tr className="flex w-full">
              <th className="text-gray-400 p-4 font-normal text-xs w-1/2">Countries</th>
              <th className="p-4 font-normal text-xs w-1/2">
              {
                DIMENSIONS_MAP[dimension].IS_BOOLEAN ?
                  '% of citizens that answered yes' :
                  DIMENSIONS_MAP[dimension].UNITS
              }
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll flex flex-col items-center justify-between overflow-y-scroll w-full countryStats-body">
            {
            countries.map((co: any, i: number) => {
                return (i < 25 || showAll) &&
                <tr className="flex w-full cursor-pointer"
                    key={i} onClick={() => actions.setCurrentCountry(co.Name)}>
                    <td className="p-2 w-1/2">
                      {i+1}. {co.Name}
                    </td>
                    <td className="p-2 w-1/2">
                      {Math.round(co[dimension]*100/100)}
                      {/* <Progress
                        value={Math.round(co[dimension]*100)/100}
                        total={DIMENSIONS_MAP[dimension].MAX}
                        size='small'
                        progress={ DIMENSIONS_MAP[dimension].IS_BOOLEAN ? 'percent' : 'value' }
                        color={co.Name === country ? 'purple' : 'violet'} /> */}
                    </td>
                </tr>
              })
            }
            {
              !showAll &&
              <tr className="flex w-full">
                <button onClick={() => this.setState({ showAll: !showAll })}>Show all</button>
              </tr>
            }
            </tbody>
          </table>
        </div>
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