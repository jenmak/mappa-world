import React from 'react';
import earth from '../sketches/earth';
import legend from '../sketches/legend';
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import { ICountryState } from '../reducers/countryReducer';
import { DIMENSIONS_MAP } from '../constants/dimensions';
export interface IGlobeContainerProps {
  country: string;
  dimensions: string[];
  questionId: number;
}

const GlobeContainer = ({ country, dimensions, questionId }: IGlobeContainerProps) => (
  <div>
    <P5Wrapper
      sketch={legend}
      sizeFactor={DIMENSIONS_MAP[dimensions[questionId]].SHORT}
    />
    <P5Wrapper
      sketch={earth}
      selectedCountry={country}
      sizeFactor={dimensions[questionId]}
      />
  </div>

)

const mapStateToProps = (state: { data: ICountryState}) => ({
  country: state.data.country,
  dimensions: state.data.dimensions,
  questionId: state.data.questionId
});

export default connect(mapStateToProps)(GlobeContainer);