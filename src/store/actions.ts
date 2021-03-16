import {
  COUNTRY_PER_PAGE,
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_GEO,
  SET_USER,
  SET_USER_LANGUAGE,
  SET_SEARCH,
  SET_FIRST_CARD_REF, SET_ATTRACTIONS,
} from 'appConstants';
import { CountryType, DBUser, GeoType, SliderDataType, State } from 'types';
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

//  payload = page of countryList
export const setPageCountry = (payload: number) => ({
  type: SET_USER_LANGUAGE,
  payload: (payload - 1) * COUNTRY_PER_PAGE,
});

export const setAttractions = (payload: SliderDataType[]) => ({
  type: SET_ATTRACTIONS,
  payload
});

export const loadCountryList = (option: {
  offset: number;
  count: number;
  filter: string;
  lang: string;
}) => async (dispatch: (func: unknown) => void) => {
  const { lang, filter, offset, count } = option;
  database
    .getCountriesList(count, offset, filter, lang)
    .then((countries) => {
      dispatch(setCountriesList(countries));
    })
    .catch((err) => {
      // console.error(err);
      throw new Error(`Can not read countries list data. ${err}`);
    });
};

export const loadCountry = (
  id: string
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  database
    .getCountryById(id)
    .then((country) => {
      dispatch(setCountry(country));
    })
    .catch((err) => {
      throw new Error(`Can not read country data. ${err}`);
    });
};

export const loadUserInfo = (
  id: string
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  database
    .getUserInfo(id)
    .then((user) => {
      dispatch(setUserInfo(user));
    })
    .catch((err) => {
      throw new Error(`Can not read UserInfo. ${err}`);
    });
};

export const loadGeo = (): ThunkAction<
  void,
  State,
  unknown,
  Action<string>
> => async (dispatch) => {
  database
    .getGeo()
    .then((geoData: [GeoType]) => geoData[0])
    .then((geoData) => dispatch(setGeo(geoData)))
    .catch((err) => {
      throw new Error(`Can not read Geo data. ${err}`);
    });
};

export const loadAttractions = (
  id: string
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  database
    .getAttractions(id)
    .then((attractionsArray) => {
      dispatch(setAttractions(attractionsArray));
    })
    .catch((err) => {
      throw new Error(`Can not read Attractions data. ${err}`);
    });
};
