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
  theme: string;
  currencies: string[];
  attractionRates: { attrId: string; rating: number }[];
};

export type LanguagesType = {
  en?: string;
  ru?: string;
  be?: string;
};

export type SliderDataType = {
  id: string;
  photo: string;
  name: LanguagesType;
  description: LanguagesType;
  rating: {
    sum: number;
    count: number;
  };
};

export type CountryType = {
  id: string;
  iso3: string;
  name: LanguagesType;
  capital: LanguagesType;
  currency: string;
  description?: LanguagesType;
  population?: number;
  area?: number;
  languages?: string[];
  videos?: string[];
  photos?: string[];
  locale?: string;
  timeZone?: string;
  attractions?: SliderDataType[];
};

export type State = {
  userInfo: UserInfo;
  country: CountryType;
  countryList: CountryType[] | [];
  search: string;
  firstCardRef: React.RefObject<HTMLDivElement> | null;
  offset: number;
  geo: GeoType;
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

export type DBUser = {
  id: string;
  name: string;
  avatar: string;
  lang: string;
  theme: string;
  currencies: string[];
};

export type GeoPointType = [number, number];

export type GeoType = {
  [key: string]: {
    type: string;
    coordinates: [[GeoPointType[]]];
    properties: {
      capital: GeoPointType;
    };
  };
};

export type YMapsPanoramaManager = {
  enableLookup: () => void;
  disableLookup: () => void;
  isLookupEnabled: () => boolean;
};

export type YMapsLayer = {
  getTileUrl: (tileNumber: number[], zoom: number) => string;
  getTileSize: () => [number, number];
};

export type RatingServerResponse = {
  attrId: string;
  countryId: string;
  userId: string;
  userRating: number;
  attrRating: {
    sum: number;
    count: number;
  };
};
