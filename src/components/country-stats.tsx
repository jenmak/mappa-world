import React from 'react';
import { DIMENSIONS_MAP, DIMENSION_NAMES } from '../constants/dimensions';
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';
import PercentageRing from './percentage-ring';
export interface ICountryStatsProps {
  country: any;
  countries: any[];
  isGlobeVisible: boolean;
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
    const { actions, country, countries, dimension, isGlobeVisible } = this.props;
    let { showAll } = this.state;
    return (
      <div className={`sm:fixed z-10 right-0 top-0 m-4 sm:m-12 md:my-16 md:mx-16 sm:w-1/3 lg:w-1/4 ${isGlobeVisible ? 'fadeIn' : 'fadeOut'}`}>
        <div className="sm:absolute opacity-50 bg-purple-dark w-full z-40 sm:rounded sm:shadow-sm countryStats-bkg"></div>
        <div className="sm:absolute z-50 w-full">
        <div className="text-xs text-white text-right p-3">
          {
            DIMENSIONS_MAP[dimension].IS_BOOLEAN ?
              '% of citizens that answered yes' :
              DIMENSIONS_MAP[dimension].UNITS
          }
        </div>
        <div className="overflow-y-scroll w-full countryStats-body">
        {
          countries.map((co: any, i: number) => {
              return (i < 25 || showAll) &&
              <div className="p-3 flex flex-row items-center justify-between cursor-pointer hover:bg-purple-dark"
                  key={i}
                  onClick={() => actions.setCurrentCountry(co.Name)}>     
                <div className="flex flex-row items-center">           
                  <PercentageRing radius={20} stroke={3} text={i+1} color={co[DIMENSION_NAMES.LIFE_LADDER]} progress={co[dimension]/DIMENSIONS_MAP[dimension].MAX*100} />
                  <p className={`text-sm mx-3 ${co.Name === country ? 'text-mustard' : 'text-white'}`}>{ co.Name }</p>
                </div>
                {
                  DIMENSIONS_MAP[dimension].IS_BOOLEAN ? 
                  <p className="text-white text-sm">{Math.round(co[dimension]/DIMENSIONS_MAP[dimension].MAX*100) + '%' }</p> :
                  <p className="text-white text-sm">{Math.round(co[dimension])}{ dimension === DIMENSION_NAMES.LIFE_LADDER && '/' + DIMENSIONS_MAP[dimension].MAX}</p>
                }
              </div>
            })
          }
        </div>
        {
            !showAll &&
            <button className="w-full text-sm bg-purple-dark text-white p-2 rounded shadow-sm mt-2" onClick={() => this.setState({ showAll: !showAll })}>Show all</button>
        }
        </div>
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
  isGlobeVisible: state.data.isGlobeVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryStats);