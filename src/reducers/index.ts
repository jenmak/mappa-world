import { combineReducers } from 'redux';
import countryReducer from './countryReducer';

const rootReducer = combineReducers({
    data: countryReducer
});

export default rootReducer;