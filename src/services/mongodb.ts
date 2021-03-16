import {
  CountryType,
  CurrencyType,
  DBUser,
  GeoType,
  RatingServerResponse,
} from 'types';
import { COUNTRY_PER_PAGE } from 'appConstants';

class MongoDatabase {
  private readonly URL: string;

  constructor() {
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
}

export const database = MongoDatabase.create();
