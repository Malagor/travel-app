import 'moment/locale/en-gb';
import 'moment/locale/be';
import 'moment/locale/ru';
import moment from 'moment-timezone';
import React, { FC, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, DigitalWatch, DateString } from './components';
import classes from './ClockWidget.module.scss';

const getTimeForClock = (date: moment.Moment) => {
  const hour = Number(date.format('h'));
  const min = Number(date.format('mm'));
  const sec = Number(date.format('ss'));

  return { hour, min, sec };
};

const getCountryTime = (date: moment.Moment) => date.format('hh: mm: ss');
const getCountryDate = (date: moment.Moment) => {
  const dayOfWeek = date.format('dddd');
  const fullDate = date.format('ll');
  return { dayOfWeek, fullDate };
};

type TClockWidgetProps = {
  data: {
    localeCity: {
      name: string;
      timezone: string;
    };
    otherCity: {
      name: string;
      timezone: string;
    };
  };
  theme: string;
};

export const ClockWidget: FC<TClockWidgetProps> = ({ data, theme }) => {
  const { localeCity, otherCity } = data;

  const [, i18n] = useTranslation();

  const [localeDate, setLocaleDate] = useState<null | moment.Moment>(null);
  const [otherDate, setOtherDate] = useState<null | moment.Moment>(null);

  const tick = useCallback(() => {
    const dateLocaleCityNow = moment()
      .locale(i18n.language)
      .tz(localeCity.timezone);

    const dateOtherCityNow = moment()
      .locale(i18n.language)
      .tz(otherCity.timezone);

    setLocaleDate(dateLocaleCityNow);
    setOtherDate(dateOtherCityNow);
  }, [data, i18n.language]);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperClock}>
        <div className={classes.timeBlock}>
          <h4
            className={
              theme === 'light' ? classes.lightTheme : classes.darkTheme
            }
          >
            {localeCity.name}
          </h4>
          {localeDate && (
            <Clock time={getTimeForClock(localeDate)} theme={theme} />
          )}
          <div className={classes.timeBlock__time}>
            {localeDate && (
              <DigitalWatch time={getCountryTime(localeDate)} theme={theme} />
            )}
          </div>
          <div className={classes.timeBlock__time}>
            {localeDate && (
              <DateString date={getCountryDate(localeDate)} theme={theme} />
            )}
          </div>
        </div>

        <div className={classes.timeBlock}>
          <h4
            className={
              theme === 'light' ? classes.lightTheme : classes.darkTheme
            }
          >
            {otherCity.name}
          </h4>
          {otherDate && (
            <Clock time={getTimeForClock(otherDate)} theme={theme} />
          )}
          <div className={classes.timeBlock__time}>
            {otherDate && (
              <DigitalWatch time={getCountryTime(otherDate)} theme={theme} />
            )}
          </div>
          <div className={classes.timeBlock__time}>
            {otherDate && (
              <DateString date={getCountryDate(otherDate)} theme={theme} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
