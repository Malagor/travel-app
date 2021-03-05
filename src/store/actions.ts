import { SET_COUNTRIES_LIST, SET_COUNTRY } from 'appConstants';
import { StateCountry } from '../types';

export const setCountry = (payload: StateCountry) => ({
  type: SET_COUNTRY,
  payload,
});

export const setCountriesList = (payload: StateCountry[]) => ({
  type: SET_COUNTRIES_LIST,
  payload,
});

export const setLanguage = (payload: string) => ({
  type: SET_COUNTRIES_LIST,
  payload,
});
