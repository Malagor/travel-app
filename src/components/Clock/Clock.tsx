import React, { useState } from 'react';
import classes from './Clock.module.scss';

const FACTOR_MINUTE_AND_SEC = 6;
const getDegForHourArrow = (hour: number, min: number) => 30*(hour + (1/60)*min)

type TClockProps = {
  theme: string;
  date: Date;
};

export const Clock = (props: TClockProps) => {
  const { theme, date } = props;

  const cls = [classes.Clock];
  if (theme === 'light') {
    cls.push(classes.light);
  }

 
  const [hour, setHour] = useState(date.getHours())
  const [min,setMin] = useState(date.getMinutes())
  const [sec, setSec] = useState(date.getSeconds())

  const changeSec = () => setSec(sec + 1)
  const changeMin = () => setMin(min + 1)
  const changeHour = () => setHour(hour + 1)

  setTimeout(changeSec, 1000)
  setTimeout(changeMin, 1000 * 60)
  setTimeout(changeHour, 1000 * 60 * 12)

  console.log('hour', hour, 'min', min, 'sec', sec)

  return (
    <div className={cls.join(' ')}>
      <div className={classes.hour}>
        <div
          className={classes.hr}
          style={{
            transform: `rotateZ(${getDegForHourArrow(hour, min)}deg)`,
          }}
        />
      </div>
      <div className={classes.min}>
        <div
          className={classes.mn}
          style={{
            transform: `rotateZ(${min * FACTOR_MINUTE_AND_SEC}deg)`,
          }}
        />
      </div>
      <div className={classes.sec}>
        <div
          className={classes.sc}
          style={{
            transform: `rotateZ(${sec * FACTOR_MINUTE_AND_SEC}deg)`,
          }}
        />
      </div>
    </div>
  );
}