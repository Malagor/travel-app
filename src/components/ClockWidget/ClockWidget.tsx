import moment from 'moment-timezone';
import React, {FC, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from './components/Clock/Clock';
import { DigitalWatch } from './components/DigitalWatch/DigitalWatch';
import { DateString } from './components/Date/DateString';
import classes from './ClockWidget.module.scss';

type TClockWidgetProps = {
  theme: string;
};

export const ClockWidget: FC<TClockWidgetProps> = ({theme}) => {
  const timezoneNewYork = 'America/New_York'
  const [, i18n] = useTranslation();

  const optionsTime: object = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
 };

 const optionsDay: object = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
};

  const dateLocal = new Date()
  const [hourLocal, setHourLocal] = useState(dateLocal.getHours())
  const [minLocal, setMinLocal] = useState(dateLocal.getMinutes())
  const [secLocal, setSecLocal] = useState(dateLocal.getSeconds())
  const [timeLocal, setLocalTime] = useState(dateLocal.toLocaleString(i18n.language, optionsTime))
  const [dayLocal, setDayLocal] = useState(dateLocal.toLocaleString(i18n.language, optionsDay))
  
  const dateOtherCity = moment().tz(timezoneNewYork)
  const [hourOtherCity, setHourOtherCity] = useState(Number(dateOtherCity.format('h')))
  const [minOtherCity, setMinOtherCity] = useState(Number(dateOtherCity.format('mm')))
  const [secOtherCity, setSecOtherCity] = useState(Number(dateOtherCity.format('ss')))
  const [timeOtherCity, setTimeOtherCity] = useState(dateOtherCity.format('h:mm:ss'))
  const [dayOtherCity, setDayOtherCity] = useState(dateOtherCity.format('ll'))

  
  const tick = () => {
    const dateNowLocal = new Date()
    setHourLocal(dateNowLocal.getHours())
    setMinLocal(dateNowLocal.getMinutes())
    setSecLocal(dateNowLocal.getSeconds())
    setLocalTime(dateNowLocal.toLocaleString(i18n.language, optionsTime))
    setDayLocal(dateNowLocal.toLocaleString(i18n.language, optionsDay))

    const dateNowOtherCity = moment().tz(timezoneNewYork)
    setHourOtherCity(Number(dateNowOtherCity.format('h')))
    setMinOtherCity(Number(dateNowOtherCity.format('mm')))
    setSecOtherCity(Number(dateNowOtherCity.format('ss')))
    setTimeOtherCity(dateNowOtherCity.format('h:mm:ss'))
    setDayOtherCity(dateNowOtherCity.format('ll'))
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer) 
  }, [])


  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperClock}>

        <div className={classes.timeBlock}>
          <h4 className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>localCity</h4>
          <Clock time={{
            hour: hourLocal,
            min: minLocal,
            sec: secLocal 
          }} theme={theme}/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch time={timeLocal} theme={theme}/>
          </div>
          <div className={classes.timeBlock__time}>
            <DateString day={dayLocal} theme={theme}/>
          </div>
        </div>

        <div className={classes.timeBlock}>
          <h4 className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>{timezoneNewYork}</h4>
          <Clock time={{
            hour: hourOtherCity,
            min: minOtherCity,
            sec: secOtherCity 
          }} theme={theme}/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch time={timeOtherCity} theme={theme}/>
          </div>
          <div className={classes.timeBlock__time}>
            <DateString day={dayOtherCity} theme={theme}/>
          </div>
        </div>

      </div>
    </div>
  )
}