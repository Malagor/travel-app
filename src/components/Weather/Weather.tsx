import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import { TWeatherInfo } from 'types';
import { WEATHER_API_KEY } from 'appConstants/api';
import { ErrorMessage, Loader } from 'components';
import { WeatherView } from './components/WeatherView';

type WeatherProps = {
  city: string;
};

export const Weather: FC<WeatherProps> = ({ city }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo>(
    {} as TWeatherInfo
  );
  const [, i18n] = useTranslation();
  const locale = i18n.language;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=${locale}`;

  const getWeatherData = useCallback(
    () =>
      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Error response Data');
          }
          return resp.json();
        })
        .then((data) => {
          setWeatherInfo(data);
          setIsLoading(false);
        }),
    [url]
  );

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getWeatherData().catch(onError);
  }, [locale, city, getWeatherData]);

  const style: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '150px',
    minWidth: '200px',
    overflow: 'hidden',
  };

  const hasData = !isLoading && !isError;

  return (
    <Paper elevation={3} style={style}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && <WeatherView info={weatherInfo} />}
    </Paper>
  );
};
