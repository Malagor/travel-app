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

const getCountryTime = (date: moment.Moment) => date.format('hh: mm: ss')
const getCountryDate = (date: moment.Moment) => date.format('dddd, ll')


type TClockWidgetProps = {
  theme: string;
};

export const ClockWidget: FC<TClockWidgetProps> = ({theme}) => {
  const timezoneMyCity = 'Europe/Minsk'
  const timezoneNewYork = 'America/New_York'

  const [, i18n] = useTranslation();

  const [localeDate, setLocaleDate] = useState<null | moment.Moment>(null)
  const [otherDate, setOtherDate] = useState<null | moment.Moment>(null)

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
            {localeDate && <Clock time={getTimeForClock(localeDate)} theme={theme}/>}
          <div className={classes.timeBlock__time}>
            {localeDate && <DigitalWatch time={getCountryTime(localeDate)}  theme={theme}/>}
          </div>
          <div className={classes.timeBlock__time}>
            {localeDate && <DateString day={getCountryDate(localeDate)} theme={theme}/>}
          </div>
        </div>

        <div className={classes.timeBlock}>
          <h4 className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>{timezoneNewYork}</h4>
            {otherDate && <Clock time={getTimeForClock(otherDate)} theme={theme}/>}
          <div className={classes.timeBlock__time}>
            {otherDate && <DigitalWatch time={getCountryTime(otherDate)} theme={theme}/>}
          </div>
          <div className={classes.timeBlock__time}>
            {otherDate && <DateString day={getCountryDate(otherDate)} theme={theme}/>}
          </div>
        </div>

      </div>
    </div>
  )
}