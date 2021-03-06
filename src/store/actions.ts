import {
  COUNTRY_PER_PAGE,
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_GEO,
  SET_USER,
  SET_USER_LANGUAGE,
  SET_SEARCH,
  SET_FIRST_CARD_REF,
  SET_LOGIN_STATUS, SET_USER_NAME, SET_USER_AVATAR,
} from 'appConstants';
import { CountryType, DBUser, GeoType, State } from 'types';
import { database } from 'services';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

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

export const setSearch = (payload: string) => ({
  type: SET_SEARCH,
  payload,
});

export const setFirstCardRef = (
  payload: React.RefObject<HTMLDivElement> | null
) => ({
  type: SET_FIRST_CARD_REF,
  payload,
});

export const setUserInfo = (payload: DBUser) => ({
  type: SET_USER,
  payload,
});

export const setGeo = (payload: GeoType) => ({
  type: SET_GEO,
  payload,
});

export const setLoginStatus = (payload: boolean) => ({
  type: SET_LOGIN_STATUS,
  payload,
});

export const setUserName = (payload: string) => ({
  type: SET_USER_NAME,
  payload,
});

export const setUserAvatar = (payload: string) => ({
  type: SET_USER_AVATAR,
  payload,
});


//  payload = page of countryList
export const setPageCountry = (payload: number) => ({
  type: SET_USER_LANGUAGE,
  payload: (payload - 1) * COUNTRY_PER_PAGE,
});

export const loadCountryList = (option: {
  offset: number;
  count: number;
  filter: string;
  lang: string;
}) => async (dispatch: (func: unknown) => void) => {
  const { lang, filter, offset, count } = option;
  await database
    .getCountriesList(count, offset, filter, lang)
    .then((countries) => {
      dispatch(setCountriesList(countries));
    })

};

export const loadCountry = (
  id: string
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  await database
    .getCountryById(id)
    .then((country) => {
      dispatch(setCountry(country));
    })

};

export const loadUserInfo = (
  id: string
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  database
    .getUserInfo(id)
    .then((user) => {
      dispatch(setUserInfo(user));
    })

};

export const loadGeo = (): ThunkAction<
  void,
  State,
  unknown,
  Action<string>
> => async (dispatch) => {
  await database
    .getGeo()
    .then((geoData: [GeoType]) => geoData[0])
    .then((geoData) => dispatch(setGeo(geoData)))
   
};
