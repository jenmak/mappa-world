import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';
import { ICountryState } from '../reducers/countryReducer';
export interface IHappinessHeaderProps {
  actions: any;
  isGlobeVisible: boolean;
}

const HappinessHeader = ({ actions, isGlobeVisible }: IHappinessHeaderProps) => (
  <div className={isGlobeVisible?'fadeOut': 'fadeIn'}>
    <div className="bg-purple-darker opacity-75 sm:fixed z-50 w-full sm:h-screen"></div>
    <div className="px-4 py-12 sm:p-24 flex flex-col justify-center w-full sm:h-screen sm:fixed z-50 cursor-pointer"
          onClick={actions.toggleVisibility}>
      <div>
        <h2 className="text-2xl md:text-3xl text-white">Visualizing</h2>
        <h1 className="text-4xl md:text-6xl text-white">World <span className="text-cyan">Happiness</span></h1>
      </div>
      <div>
        <button className="text-cyan fixed z-80 hidden sm:block" onClick={() => actions.toggleVisibility}>Click to view</button>
      </div>
    </div>
  </div>
  )

const mapStateToProps = (state: { data: ICountryState}) => ({
  isGlobeVisible: state.data.isGlobeVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HappinessHeader);