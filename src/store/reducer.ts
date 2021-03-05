import { Reducer } from 'redux';
import { State } from 'types';
import {
  SET_COUNTRIES_LIST,
  SET_COUNTRY,
  SET_USER_LANGUAGE, SET_USER,
} from 'appConstants';


const initialState: State = {
  settings: {
    theme: 'light',
    currencyList: [
      {
        id: 'RUB',
        nameRu: 'Российский рубль',
        nameEn: 'Russian Ruble',
        nameBe: 'Расійскі рубель',
      },
      {
        id: 'USD',
        nameRu: 'Доллар США',
        nameEn: 'US Dollar',
        nameBe: 'Долар ЗША',
      },
      {
        id: 'EUR',
        nameRu: 'Евро',
        nameEn: 'Euro',
        nameBe: 'Еўра',
      },
      {
        id: 'BYN',
        nameRu: 'Беларусский рубль',
        nameEn: 'Belorussian Ruble',
        nameBe: 'Белаускі рубель',
      },
    ],
  },
  userInfo: {
    id: '1',
    name: 'Вася Пупилкин',
    avatar: 'https://i.pravatar.cc/200',
  },
  country: {
    id: '',
    name: {
      en: '',
      ru: '',
      be: '',
    },
    capital: {
      en: '',
      ru: '',
      be: '',
    },
    locale: '',
    timeZone: ''
  },
  countryList: [],
  lang: 'ru',
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
    case SET_USER:
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
};
