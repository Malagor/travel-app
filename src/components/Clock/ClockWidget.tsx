import React from 'react';
import { Clock } from './Clock';
import { Time } from './Time';
import classes from './ClockWidget.module.scss';

type TClockWidgetProps = {
  theme: string;
};

export const ClockWidget = (props: TClockWidgetProps) => {
  const date = new Date()
 /*  придут в пропсах города для отображения */ 
  const localCity = "localCity" 
  const otherCity = "otherCity" 

  const optionsTime: object = {
     hour: 'numeric',
     minute: 'numeric',
     second: 'numeric'
  }

  const optionsData: object = {
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     weekday: 'long',
     timezone: 'UTC',
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperClock}>

        <div className={classes.timeBlock}>
          {/* Local Clock */}
          <h4>{localCity}</h4>
          <Clock theme={props.theme} date={date}/>
          <div className={classes.timeBlock__time}>
            <Time options={optionsTime}/>
          </div>
        </div>

        <div className={classes.timeBlock}>
          {/* Other Clock */}
          <h4>{otherCity}</h4>
          <Clock theme={props.theme} date={date}/>
          <div className={classes.timeBlock__time}>
            <Time options={optionsTime}/>
          </div>
        </div>

      </div>

      <div className={classes.timeBlock__time}>
        <Time options={optionsData}/>
      </div>
    </div>
  )
} 