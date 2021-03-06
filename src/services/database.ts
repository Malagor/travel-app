import { CurrencyType, StateCountry } from 'types';
import { countries } from 'services/mockupDataCountries';

type DBUser = {
  id: string;
  name: string;
  avatar: string;
  lang: string;
  theme: string;
  currencies: string[];
};

type DatabaseType = {
  users: DBUser[];
  countriesList: StateCountry[];
  currenciesList: CurrencyType;
};

const initialDB: DatabaseType = {
  users: [
    {
      id: '1',
      name: 'Вася Пупилькин',
      avatar: 'https://i.pravatar.cc/200',
      theme: 'light',
      currencies: ['RUB', 'USD', 'EUR', 'BYN'],
      lang: 'ru',
    },
  ],
  countriesList: countries,
  currenciesList: {
    RUB: {
      nameRu: 'Российский рубль',
      nameEn: 'Russian Ruble',
      nameBe: 'Расійскі рубель',
    },
    USD: {
      nameRu: 'Доллар США',
      nameEn: 'US Dollar',
      nameBe: 'Долар ЗША',
    },
    EUR: {
      nameRu: 'Евро',
      nameEn: 'Euro',
      nameBe: 'Еўра',
    },
    BYN: {
      nameRu: 'Беларусский рубль',
      nameEn: 'Belorussian Ruble',
      nameBe: 'Белаускі рубель',
    },
  },
};

export class Database {
  private DB: DatabaseType;

  constructor() {
    this.DB = initialDB;
  }

  static create(): Database {
    return new Database();
  }

  getCountriesList = (): StateCountry[] => this.DB.countriesList;

  getCountryById = (id: number): StateCountry => this.DB.countriesList[id];

  getUserInfo = (id: string): DBUser =>
    this.DB.users.filter((user: DBUser) => user.id === id)[0];

  getCurrenciesList = (): CurrencyType => this.DB.currenciesList;
}
