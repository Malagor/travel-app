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
  [key: string]: { nameRu: string; nameEn: string; nameBe: string };
};

export type UserInfo = {
  id: string;
  name: string;
  avatar: string;
  lang: string;
};

export type SettingsType = {
  theme: string;
  currencyList: CurrencyType;
};

export type LanguagesType = {
  en?: string;
  ru?: string;
  be?: string;
};

export type CountryType = {
  id: string | number;
  name: LanguagesType;
  capital: LanguagesType;
  currency?: string;
  description?: LanguagesType;
  population?: number;
  area?: number;
  languages?: string[];
  videos?: string[];
  photos?: string[];
  locale?: string;
  timeZone?: string;
};

export type State = {
  settings: SettingsType;
  userInfo: UserInfo;
  country: CountryType;
  countryList: CountryType[] | [];
};

export type CurrencyRatesInfo = {
  base_code: string;
  conversion_rates: { [key: string]: number };
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
};
