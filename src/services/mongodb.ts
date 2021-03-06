import {
  CountryType,
  CurrencyType,
  DBUser,
  GeoType,
  RatingServerResponse,
  UserInfo,
} from 'types';
import { COUNTRY_PER_PAGE } from 'appConstants';

class MongoDatabase {
  private readonly URL: string;

  constructor() {
    // this.URL = 'http://localhost:3001';
    this.URL = 'https://malagor-travel-app-47934.herokuapp.com';
  }

  static create(): MongoDatabase {
    return new MongoDatabase();
  }

  getCountriesList = async (
    count: number = COUNTRY_PER_PAGE,
    offset: number = 0,
    filter: string = '',
    lang: string = 'ru'
  ): Promise<CountryType[]> =>
    fetch(
      `${this.URL}/country?count=${count}&offset=${offset}&filter=${filter}&lang=${lang}`
    ).then((data) => data.json());

  getCountryById = async (id: string): Promise<CountryType> =>
    fetch(`${this.URL}/country/${id}`).then((data) => data.json());

  getUserInfo = async (id: string): Promise<DBUser> =>
    fetch(`${this.URL}/user/${id}`).then((data) => data.json());

  getCurrenciesList = async (): Promise<CurrencyType> =>
    fetch(`${this.URL}/currency`).then((data) => data.json());

  getGeo = async (): Promise<[GeoType]> =>
    fetch(`${this.URL}/geo`).then((data) => data.json());

  setRating = async (
    countryId: string,
    attractionId: string,
    userId: string,
    rating: number
  ): Promise<RatingServerResponse> => {
    const url = `${this.URL}/country/${countryId}/attraction`;
    const data = {
      attractionId,
      userId,
      rating,
    };

    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  createUser = async (
    id: string,
    name: string,
    lang: string = 'ru',
    avatar: string = ''
  ): Promise<UserInfo> => {
    const url = `${this.URL}/user`;
    const userData: UserInfo = {
      id,
      name,
      lang,
      avatar,
      theme: 'light',
      currencies: ['USD', 'EUR', 'BYN', 'RUB'],
      attractionRates: [],
    };

    const body = JSON.stringify(userData);

    return fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  updateLang = async (userId: string, lang: string) => {
    const url = `${this.URL}/user/${userId}/lang`;
    const body = JSON.stringify({ lang });

    return fetch(url, {
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };


}

export const database = MongoDatabase.create();
