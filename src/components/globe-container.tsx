import React from 'react';
import sketch from '../sketches/sketch';
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';

export interface IGlobeContainerProps {
  country: string;
  dimensions: string[];
  questionId: number;
}

const GlobeContainer = ({ country, dimensions, questionId }: IGlobeContainerProps) => (
  <P5Wrapper
    sketch={sketch}
    selectedCountry={country}
    sizeFactor={dimensions[questionId]}
    />
)

const mapStateToProps = (state: { data: ICountryState}) => ({
  country: state.data.country,
  dimensions: state.data.dimensions,
  questionId: state.data.questionId
});

export default connect(mapStateToProps)(GlobeContainer);