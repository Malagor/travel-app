import { State, StateCountry, StateUserInfo } from 'types';
import { countries } from './mockupDataCountries';

export class Database {
  private DB: State;

  constructor() {
    this.DB = {
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
        timeZone: '',
      },
      countryList: countries,
      lang: 'ru',
    };
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = (): StateCountry[] => this.DB.countryList;

  getCountryById = (id: number): StateCountry => this.DB.countryList[id];

  getUserInfo = (): StateUserInfo => this.DB.userInfo;
}
