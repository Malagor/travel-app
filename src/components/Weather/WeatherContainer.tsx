import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import { ErrorMessage, Loader } from 'components';
import { TWeatherInfo } from './WeatherInfo.types';
import Weather from './components/Weather';

type WeatherContainerProps = {
  city: string;
};

export const WeatherContainer: FC<WeatherContainerProps> = ({ city }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo>(
    {} as TWeatherInfo
  );
  const [, i18n] = useTranslation();
  const locale = i18n.language;

  const API_KEY = '0dd4c70fbcb17123e868e6d308f9906a';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${locale}`;

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
      {hasData && <Weather info={weatherInfo} />}
    </Paper>
  );
};
