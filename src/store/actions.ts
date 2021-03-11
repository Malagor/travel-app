import {
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_USER_LANGUAGE,
} from 'appConstants';
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

export const loadCountryList = () => async (
  dispatch: (func: unknown) => void
) => {
  const url = 'http://localhost:3001/country';

  fetch(url)
    .then((res) => res.json())
    .then(countries => {
      dispatch(setCountriesList(countries))
    })
    .catch((err) => {
      console.error(err);
    });
};

export const loadCountry = (id: string) => async (
  dispatch: (func: unknown) => void
) => {
  const url = `http://localhost:3001/country/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then(country => {
      dispatch(setCountry(country))
    })
    .catch((err) => {
      console.error(err);
    });
};
