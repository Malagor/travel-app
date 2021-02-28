import React, { FC, useCallback, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { ErrorMessage, Loader } from 'components';
import { TWeatherInfo } from './WeatherInfo.types';
import classes from './Weather.module.scss';

type WeatherProps = {
  locale: string;
  city: string;
};

export const Weather: FC<WeatherProps> = ({ locale, city }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo>(
    {} as TWeatherInfo
  );

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
    const { temp, feels_like: feelsLike, humidity } = weatherInfo.main;
    const { speed: windSpeed } = weatherInfo.wind;

    return (
      <div className={classes.weather}>
        <div className={classes.weatherHeader}>
          <div className={classes.weatherTitle}>
            <h3>{cityName}</h3>
            <span>{description}</span>
          </div>
          <div
            className={classes.weatherIcon}
            style={{
              backgroundImage: `url(http://openweathermap.org/img/wn/${icon}@2x.png)`,
            }}
          />
        </div>
        <div className={classes.weatherBody}>
          <div className={classes.weatherTemperature}>{`${Math.round(
            temp
          )}°`}</div>
          <div className={classes.weatherInfo}>
            <div className={classes.weatherItem}>
              Feels like:
              <span>{`${Math.round(feelsLike)}°C`}</span>
            </div>
            <div className={classes.weatherItem}>
              Wind:
              <span>{`${windSpeed} m/s`}</span>
            </div>
            <div className={classes.weatherItem}>
              Humidity:
              <span>{`${humidity}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '150px',
    minWidth: '200px',
    padding: isError ? '20px' : '0',
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
