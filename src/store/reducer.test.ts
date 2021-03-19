import { CountryType, DBUser, GeoType, State } from 'types';
import * as actions from './actions';
import { initialState } from './initialState';
import { appReducer } from './reducer';

let state: State;
let country: CountryType;

beforeEach(() => {
  state = initialState();
  country = {
    id: '0',
    iso3: 'BLR',
    name: { en: 'Belarus', ru: 'Беларусь', be: 'Беларусь' },
    capital: { en: 'Minsk', ru: 'Минск', be: 'Мінск' },
    currency: 'BYN',
    timeZone: 'Europe/Minsk',
  };
});

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, { type: 'test', payload: '' })).toEqual(state);
  });

  it('should handle SET_COUNTRY', () => {
    const newState = appReducer(state, actions.setCountry(country));
    expect(newState).toEqual({ ...state, country });
  });

  it('should handle SET_COUNTRIES_LIST', () => {
    const newState = appReducer(state, actions.setCountriesList([country]));
    expect(newState.countryList).toEqual(expect.arrayContaining([country]));
  });

  it('should handle SET_USER_LANGUAGE', () => {
    const lang = 'be';
    const newState = appReducer(state, actions.setLanguage('be'));
    expect(newState.userInfo.lang).toEqual(lang);
  });

  it('should handle SET_SEARCH', () => {
    const search = 'Belarus';
    const newState = appReducer(state, actions.setSearch(search));
    expect(newState.search).toEqual(search);
  });

  it('should handle SET_USER', () => {
    const user: DBUser = {
      id: '0',
      name: 'Alice',
      avatar: 'img',
      lang: 'be',
      currencies: ['EUR'],
      theme: 'dark',
    };
    const newState = appReducer(state, actions.setUserInfo(user));
    expect(newState.userInfo).toEqual(user);
  });

  it('should handle SET_GEO', () => {
    const geo: GeoType = {
      BLR: {
        type: 'MultiPolygon',
        coordinates: [[[[0, 0]]]],
        properties: { capital: [0, 0] },
      },
    };
    const newState = appReducer(state, actions.setGeo(geo));
    expect(newState.geo).toEqual(geo);
  });

  it('should handle SET_LOGIN_STATUS', () => {
    const newState = appReducer(state, actions.setLoginStatus(true));
    expect(newState.userIsLogin).toBeTruthy();
  });
});
