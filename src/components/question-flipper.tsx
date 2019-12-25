import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';
import { ICountryState } from '../reducers/countryReducer';
import { DIMENSIONS_MAP } from '../constants/dimensions';

export interface IQuestionFlipperProps {
  dimensions: string[];
  questionId: number;
  actions: any;
}

const QuestionFlipper = ({ dimensions, questionId, actions}: IQuestionFlipperProps) => (
  <div className="fixed z-40 top-0 left-0 mx-16 my-16 md:w-1/3 lg:w-1/4">
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
        <button className="text-xs text-left text-gray-700" onClick={actions.getPrevQuestion}>
          See previous
        </button>
      }
      {
        questionId < dimensions.length - 1 && 
        <button className="text-xs text-right text-gray-700" onClick={actions.getNextQuestion}>
          See next question
        </button>
      }
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: { data: ICountryState}) => ({
  dimensions: state.data.dimensions,
  questionId: state.data.questionId
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFlipper);