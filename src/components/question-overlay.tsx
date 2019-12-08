import React from 'react';
import { connect } from "react-redux";
import { ICountryState } from '../reducers/countryReducer';

export interface IQuestionOverlayProps {
  dimension: string
}

const QuestionOverlay = ({dimension}: IQuestionOverlayProps) => {
  return (<div>{dimension}</div>)
}

const mapStateToProps = (state: { data: ICountryState }) => {
  dimension: state.data.dimensions[state.data.questionId]
};

export default connect(mapStateToProps, {})(QuestionOverlay);