import { darken } from '@material-ui/core';
import { WEATHER_COLOR } from 'appConstants/colors';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TWeatherInfo } from 'types';
import classes from './WeatherView.module.scss';

type WeatherViewProps = {
  info: TWeatherInfo;
};

export const WeatherView: FC<WeatherViewProps> = ({ info }) => {
  const { name: cityName } = info;
  const { description, icon } = info.weather[0];
  const { temp, humidity } = info.main;
  const { all: cloudCover } = info.clouds;
  const { speed: windSpeed } = info.wind;
  const [t] = useTranslation();

  const iconUrl = `url(http://openweathermap.org/img/wn/${icon}@2x.png)`;

  return (
    <div className={classes.weather}>
      <div
        className={classes.weatherHeader}
        style={{ backgroundColor: WEATHER_COLOR }}
      >
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
        <div
          className={classes.weatherTemperature}
          style={{ color: darken(WEATHER_COLOR, 0.35) }}
        >{`${Math.round(temp)}°`}</div>
        <div className={classes.weatherInfo}>
          <div className={classes.weatherItem}>
            {t('Weather.humidity')}:<span>{`${humidity}%`}</span>
          </div>
          <div className={classes.weatherItem}>
            {t('Weather.wind')}:
            <span>{`${windSpeed} ${t('Weather.metersPerSecond')}`}</span>
          </div>
          <div className={classes.weatherItem}>
            {t('Weather.cloudCover')}:<span>{`${cloudCover}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
