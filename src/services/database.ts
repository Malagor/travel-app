import { State, StateCountry, StateUserInfo } from 'types';
import { initialState } from 'store/reducer';

export class Database {
  private DB: State;

  constructor() {
    this.DB = initialState;
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = (): StateCountry[] => this.DB.countryList;

  getCountryById = (id: number): StateCountry => this.DB.countryList[id];

  getUserInfo = (): StateUserInfo => this.DB.userInfo;
}
