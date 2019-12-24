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
      <div className="fixed z-10 right-0 bottom-0 m-12 md:my-24 md:mx-16 md:w-1/3 lg:w-1/4">
        <div className="bg-white rounded">
          <table className="table-fixed w-full">
            <thead className="flex w-full">
              <tr className="flex w-full">
                <th className="text-gray-500 p-4 font-normal text-xs w-1/2">Countries</th>
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
                      <td className="p-2 w-1/2 text-xs">
                        {i+1}. {co.Name}
                      </td>
                      <td className="p-2 w-1/2 text-xs">
                        <div className="shadow w-full bg-grey-light rounded">
                          <div className={ `${co.Name === country ? 'bg-mustard' : 'bg-purple-dark'}`}
                                style={{'width': `${ co[dimension]/DIMENSIONS_MAP[dimension].MAX*100 }%`}}>
                            {Math.round(co[dimension]*100)/100}
                          </div>
                        </div>
                        {/* TODO: progress={ DIMENSIONS_MAP[dimension].IS_BOOLEAN ? 'percent' : 'value' } */}
                      </td>
                  </tr>
                })
              }
              </tbody>
            </table>
          </div>
          {
            !showAll &&
              <button className="w-full text-sm bg-purple-dark text-white p-2 rounded shadow-sm mt-2" onClick={() => this.setState({ showAll: !showAll })}>Show all</button>
          }
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