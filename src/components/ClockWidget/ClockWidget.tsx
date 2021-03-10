import 'moment/locale/en-gb';
import 'moment/locale/be';
import 'moment/locale/ru';
import moment from 'moment-timezone';
import React, {FC, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Clock,  DigitalWatch,  DateString } from './components';
import classes from './ClockWidget.module.scss';

 
const getTimeForClock = (date: moment.Moment) => {
    const hour= Number(date.format('h'))
    const min = Number(date.format('mm'))
    const sec = Number(date.format('ss'))

    return {hour, min, sec}
}

const getTimeDigitalWatch = (date: moment.Moment) => date.format('hh: mm: ss')
const getTimeDate = (date: moment.Moment) => date.format('dddd, ll')


type TClockWidgetProps = {
  theme: string;
};

export const ClockWidget: FC<TClockWidgetProps> = ({theme}) => {
  const timezoneMyCity = 'Europe/Minsk'
  const timezoneNewYork = 'America/New_York'

  const [, i18n] = useTranslation();

  const dateLocaleCity = moment().locale(i18n.language).tz(timezoneMyCity)
  const dateOtherCity = moment().locale(i18n.language).tz(timezoneNewYork)

  const [localeDate, setLocaleDate] = useState(dateLocaleCity)
  const [otherDate, setOtherDate] = useState(dateOtherCity)

  const tick = () => {
    const dateLocaleCityNow = moment().locale(i18n.language).tz(timezoneMyCity)
    const dateOtherCityNow = moment().locale(i18n.language).tz(timezoneNewYork)

    setLocaleDate(dateLocaleCityNow)
    setOtherDate(dateOtherCityNow)
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer) 
  }, [tick])

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperClock}>

        <div className={classes.timeBlock}>
          <h4 className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>localCity</h4>
          <Clock time={getTimeForClock(localeDate)} theme={theme}/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch time={getTimeDigitalWatch(localeDate)}  theme={theme}/>
          </div>
          <div className={classes.timeBlock__time}>
            <DateString day={getTimeDate(localeDate)} theme={theme}/>
          </div>
        </div>

        <div className={classes.timeBlock}>
          <h4 className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>{timezoneNewYork}</h4>
          <Clock time={getTimeForClock(otherDate)} theme={theme}/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch time={getTimeDigitalWatch(otherDate)} theme={theme}/>
          </div>
          <div className={classes.timeBlock__time}>
            <DateString day={getTimeDate(otherDate)} theme={theme}/>
          </div>
        </div>

      </div>
    </div>
  )
}