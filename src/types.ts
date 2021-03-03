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

export type UserInfoType = {
  id: number;
  name: string;
  avatar: string;
};

export type CurrencyType = {
  id: string;
  nameRu: string;
  nameEn: string;
  nameBe: string;
};

export type SettingsType = {
  language: string;
  theme: string;
  currencyList: CurrencyType[];
};

export type LanguagesType = {
  en?: string;
  ru?: string;
  be?: string;
}

export type CountryType = {
  id: string;
  name: LanguagesType;
  description?: string;
  capital: LanguagesType;
  population?: number;
  currency: CurrencyType;
  area?: number;
  languages?: string[];
  videos?: string[];
  photos?: string[];
};

export type StoreType = {
  settings: SettingsType;
  userInfo: UserInfoType;
  country: string;
  lang: string;
  locale: string;
  timeZone: string;
  countryList: CountryType[];
};
