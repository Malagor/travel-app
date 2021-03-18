import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import { TWeatherInfo } from 'types';
import { WEATHER_API_KEY } from 'appConstants/api';
import { ErrorMessage, Loader } from 'components';
import { WeatherView } from './components/WeatherView';

type WeatherProps = {
  location: string;
  title: string;
};

export const Weather: FC<WeatherProps> = ({ location, title }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo>(
    {} as TWeatherInfo
  );
  const [controller, setController] = useState<AbortController | null>(null);
  const [, i18n] = useTranslation();
  const locale = i18n.language;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric&lang=${locale}`;

  const getWeatherData = useCallback(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setController(abortController);
    return fetch(url, { signal })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error response Data');
        }
        return resp.json();
      })
      .then((data) => {
        setWeatherInfo(data);
        setIsLoading(false);
      });
  }, [url]);

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    if (location) {
      getWeatherData().catch(onError);
    }
  }, [locale, location, getWeatherData]);

  useEffect(
    () => () => {
      controller?.abort();
    },
    [controller]
  );

  const style: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '150px',
    minWidth: '200px',
    overflow: 'hidden',
    margin: '0 auto',
    width: '100%'
  };

  const hasData = !isLoading && !isError;

  return (
    <Paper elevation={3} style={style}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && <WeatherView info={weatherInfo} title={title} />}
    </Paper>
  );
};
