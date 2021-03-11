import { SET_COUNTRIES_LIST, SET_COUNTRY, SET_USER_LANGUAGE } from 'appConstants';
import { CountryType } from '../types';

export const setCountry = (payload: CountryType) => ({
  type: SET_COUNTRY,
  payload,
});

export const setCountriesList = (payload: CountryType[]) => ({
  type: SET_COUNTRIES_LIST,
  payload,
});

export const setLanguage = (payload: string) => ({
  type: SET_USER_LANGUAGE,
  payload,
});
