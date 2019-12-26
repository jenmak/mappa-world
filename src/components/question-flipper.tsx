import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';
import { ICountryState } from '../reducers/countryReducer';
import { DIMENSIONS_MAP } from '../constants/dimensions';

export interface IQuestionFlipperProps {
  countries: any[];
  dimensions: string[];
  questionId: number;
  isGlobeVisible: boolean;
  actions: any;
}

const QuestionFlipper = ({ countries, dimensions, questionId, isGlobeVisible, actions}: IQuestionFlipperProps) => (
  <div className={`fixed z-40 top-0 left-0 mx-16 my-16 md:w-1/3 lg:w-1/4 ${isGlobeVisible ? 'fadeIn' : 'fadeOut'}`}>
    <div className="bg-white rounded shadow-md p-5">
    {
      (DIMENSIONS_MAP[dimensions[questionId]].IS_BOOLEAN ||
      questionId === 0) &&
      <h5 className="text-gray-600 font-body mb-3">Citizens were asked,</h5>
    }
      <h3 className="text-black mb-3">{ DIMENSIONS_MAP[dimensions[questionId]].QUESTION }</h3>
      <div className="flex justify-between">
      {
        questionId !== 0 &&
        <button className="text-xs text-left text-gray-700"
          onClick={() => {
            actions.getPrevQuestion();
            setTimeout(() => {
              actions.setCurrentCountry(countries[0].Name);
            })
          }}>
          See previous
        </button>
      }
      {
        questionId < dimensions.length - 1 && 
        <button className="text-xs text-right text-gray-700"
          onClick={() => {
            actions.getNextQuestion();
            setTimeout(() => {
              actions.setCurrentCountry(countries[0].Name);
            });
          }}>
          See next question
        </button>
      }
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: { data: ICountryState}) => ({
  countries: state.data.countries,
  dimensions: state.data.dimensions,
  questionId: state.data.questionId,
  isGlobeVisible: state.data.isGlobeVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFlipper);