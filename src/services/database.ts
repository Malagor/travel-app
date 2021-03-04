import { State, StateCountry } from 'types';
import { countries } from './mockupDataCountries';

export class Database {
  private DB: State;

  constructor() {
    this.DB = {
      settings: {},
      userInfo: {},
      country: {},
      countryList: countries,
      lang: '',
      locale: '',
      timeZone: '',
    };
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = (): StateCountry[] => this.DB.countryList;

  getCountryById = (id: number): StateCountry => this.DB.countryList[id];
}
