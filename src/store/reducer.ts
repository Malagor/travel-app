import { Reducer } from 'redux';
import {
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_USER_LANGUAGE,
  SET_USER,
  SET_THEME,
  SET_USER_CURRENCIES_LIST,
  SET_USER_AVATAR,
  SET_USER_NAME,
  SET_SEARCH,
} from 'appConstants';
import { State } from 'types';
import { initialState } from './initialState';

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export const appReducer: Reducer<State, Action> = (
  state = initialState(),
  action
) => {
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
        userInfo: { ...state.userInfo, lang: action.payload },
      };
    case SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        userInfo: { ...state.userInfo, name: action.payload },
      };
    case SET_USER_AVATAR:
      return {
        ...state,
        userInfo: { ...state.userInfo, avatar: action.payload },
      };
    case SET_USER_CURRENCIES_LIST:
      return {
        ...state,
        settings: { ...state.settings, currencyList: action.payload },
      };
    case SET_THEME:
      return {
        ...state,
        settings: { ...state.settings, theme: action.payload },
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
