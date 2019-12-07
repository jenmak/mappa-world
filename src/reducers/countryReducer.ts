import * as TYPES from '../constants/actionTypes';
import { DIMENSIONS_MAP } from '../constants/dimensions';
import countriesJson from '../data/countries.json';

export interface ICountryState {
  countries: any[],
  country: string,
  dimensions: string[],
  questionId: number
}

const initialState: ICountryState = {
    countries: countriesJson[2018],
    country: 'United States of America',
    dimensions: Object.keys(DIMENSIONS_MAP),
    questionId: 0
  };

const countryReducer = (state = initialState, action: { type: string, country: string  }) => {
  switch(action.type) {
    case TYPES.GET_NEXT_QUESTION:
      return Object.assign({}, state, { questionId: state.questionId + 1 });
    case TYPES.GET_PREV_QUESTION:
      return Object.assign({}, state, { questionId: state.questionId - 1 });
    case TYPES.SET_CURRENT_COUNTRY:
      return Object.assign({}, state, { country: action.country });
    default:
      return state;
  }
}

export default countryReducer;