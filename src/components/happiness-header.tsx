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
        <p className="text-white py-5 sm:w-2/3">The following is a visualization of world happiness based on data from the Gallup World Poll for the <a className="underline text-cyan" rel="noopener noreferrer" target="_blank" href="https://worldhappiness.report/">World Happiness Report</a>. Citizens were asked a series of questions related to how happy they perceive themselves to be, focusing on factors such as government corruption, social support and freedom of choice.</p>
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