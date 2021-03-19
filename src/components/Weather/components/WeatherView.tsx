import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TWeatherInfo } from 'types';
import { useStyles } from './styled';

type WeatherViewProps = {
  info: TWeatherInfo;
  title: string;
};

export const WeatherView: FC<WeatherViewProps> = ({ info, title }) => {
  const classes = useStyles();

  const { description, icon } = info.weather[0];
  const { temp, humidity } = info.main;
  const { all: cloudCover } = info.clouds;
  const { speed: windSpeed } = info.wind;
  const [t] = useTranslation();

  const iconUrl = `url(https://openweathermap.org/img/wn/${icon}@2x.png)`;

  return (
    <div className={classes.weather}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h3>{title}</h3>
          <span>{description}</span>
        </div>
        <div className={classes.icon} style={{ backgroundImage: iconUrl }} />
      </div>
      <div className={classes.body}>
        <div className={classes.temperature}>{`${Math.round(temp)}°`}</div>
        <div className={classes.info}>
          <div className={classes.item}>
            {t('Weather.humidity')}:<span>{`${humidity}%`}</span>
          </div>
          <div className={classes.item}>
            {t('Weather.wind')}:
            <span>{`${windSpeed} ${t('Weather.metersPerSecond')}`}</span>
          </div>
          <div className={classes.item}>
            {t('Weather.cloudCover')}:<span>{`${cloudCover}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
