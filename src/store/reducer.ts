import { Reducer } from 'redux';
import { State } from 'types';
import {
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_USER_LANGUAGE,
} from 'appConstants';

const initialState: State = {
  settings: {},
  userInfo: {},
  country: {
    id: '',
    name: {
      en: '',
      ru: '',
      be: ''
    },
    capital:
      {
      en: '',
      ru: '',
      be: ''
    },
  },
  countryList: [],
  lang: 'ru',
  locale: '',
  timeZone: '',
};

export const appReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case SET_COUNTRIES_LIST:
      return {
        ...state,
        countryList: action.payload,
      };
    case SET_USER_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};
