import { State } from 'types';

export const initialState = () => {
  const state: State = {
    countryList: [],
    userInfo: {
      id: '',
      name: '',
      avatar: '',
      lang: 'ru',
      theme: 'light',
      currencies: ['USD', 'EUR', 'BYN'],
    },
    country: {
      id: '',
      iso3: '',
      name: {
        ru: '',
        be: '',
        en: '',
      },
      capital: {
        ru: '',
        be: '',
        en: '',
      },
      description: {
        ru: '',
        be: '',
        en: '',
      },
      currency: ''
    },
    offset: 0,
    geo: {}
  };

  return state;
};
