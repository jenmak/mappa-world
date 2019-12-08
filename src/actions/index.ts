import * as TYPES from '../constants/actionTypes';

export const getNextQuestion = () => ({
    type: TYPES.GET_NEXT_QUESTION
})

export const getPrevQuestion = () => ({
    type: TYPES.GET_PREV_QUESTION
})

export const setCurrentCountry = (country: string) => ({
    type: TYPES.SET_CURRENT_COUNTRY,
    country
})

export const toggleSidebar = () => ({
    type: TYPES.TOGGLE_SIDEBAR
})