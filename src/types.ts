export type TWeatherInfo = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
};

export type CountryCardProps = {
  id: string | number;
  name: string;
  description: string;
  image: string;
};

export type CurrencyType = {
  id: string;
  nameRu: string;
  nameEn: string;
  nameBe: string;
};

export type StateUserInfo = {
  id: string;
  name: string;
  avatar: string;
};

export type StateSettings = {
  language: string;
  theme: string;
  currencyList: CurrencyType[];
};

export type LanguagesType = {
  en?: string;
  ru?: string;
  be?: string;
}

export type StateCountry = {
  id: string | number;
  name: LanguagesType;
  capital: LanguagesType;
  currency?: CurrencyType;
  description?: LanguagesType;
  population?: number;
  area?: number;
  languages?: string[];
  videos?: string[];
  photos?: string[];
};

export type State = {
  settings: StateSettings | {};
  userInfo: StateUserInfo | {};
  country: StateCountry;
  lang: string;
  locale: string;
  timeZone: string;
  countryList: StateCountry[] | [];
};
