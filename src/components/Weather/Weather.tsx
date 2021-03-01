import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import { ErrorMessage, Loader } from 'components';
import { TWeatherInfo } from './WeatherInfo.types';
import classes from './Weather.module.scss';

type WeatherProps = {
  city: string;
};

export const Weather: FC<WeatherProps> = ({ city }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo>(
    {} as TWeatherInfo
  );
  const [t, i18n] = useTranslation();
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

  const getComponent = () => {
    const { name: cityName } = weatherInfo;
    const { description, icon } = weatherInfo.weather[0];
    const { temp, humidity } = weatherInfo.main;
    const { all: cloudCover } = weatherInfo.clouds;
    const { speed: windSpeed } = weatherInfo.wind;

    const iconUrl = `url(http://openweathermap.org/img/wn/${icon}@2x.png)`;

    return (
      <div className={classes.weather}>
        <div className={classes.weatherHeader}>
          <div className={classes.weatherTitle}>
            <h3>{cityName}</h3>
            <span>{description}</span>
          </div>
          <div
            className={classes.weatherIcon}
            style={{ backgroundImage: iconUrl }}
          />
        </div>
        <div className={classes.weatherBody}>
          <div className={classes.weatherTemperature}>{`${Math.round(
            temp
          )}°`}</div>
          <div className={classes.weatherInfo}>
            <div className={classes.weatherItem}>
              {t('Weather.humidity')}:<span>{`${humidity}%`}</span>
            </div>
            <div className={classes.weatherItem}>
              {t('Weather.wind')}:<span>{`${windSpeed} m/s`}</span>
            </div>
            <div className={classes.weatherItem}>
              {t('Weather.cloudCover')}:<span>{`${cloudCover}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      {hasData && getComponent()}
    </Paper>
  );
};
