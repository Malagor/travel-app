import { CurrencyType, CountryType } from 'types';
import { COUNTRY_PER_PAGE } from 'appConstants';
import { DatabaseType, DBUser, initialDB } from './initialDB';

class Database {
  private DB: DatabaseType;

  constructor() {
    this.DB = initialDB;
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = (
    count: number = COUNTRY_PER_PAGE,
    offset: number = 0
  ): CountryType[] => {
    if (count === 0) {
      return this.DB.countriesList.slice(offset)
    }
    return this.DB.countriesList.slice(offset, offset + count);
  };

  getCountryById = (id: number): CountryType => this.DB.countriesList[id];

  getUserInfo = (id: string): DBUser =>
    this.DB.users.filter((user: DBUser) => user.id === id)[0];

  getCurrenciesList = (): CurrencyType => this.DB.currenciesList;
}


export const database = Database.create();
