import { CurrencyType, CountryType } from 'types';
import { COUNTRY_PER_PAGE } from 'appConstants';
import { DBUser } from './initialDB';

class Database {
  // private DB: DatabaseType;

  private readonly URL: string;

  constructor() {
    // this.DB = initialDB;
    this.URL = 'http://localhost:3001';
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = async (
    count: number = COUNTRY_PER_PAGE,
    offset: number = 0
  ): Promise<CountryType[]> =>
    fetch(`${this.URL}/country`).then((data) => data.json());

  // getCountryById = async (id: number): Promise<CountryType> =>
  //   this.DB.countriesList[id];

  getUserInfo = async (id: string): Promise<DBUser> =>
    fetch(`${this.URL}/user/${id}`).then((data) => data.json());
  // this.DB.users.filter((user: DBUser) => user.id === id)[0];

  getCurrenciesList = async (): Promise<CurrencyType> =>
    fetch(`${this.URL}/currency`).then((data) => data.json());
}

export const database = Database.create();
