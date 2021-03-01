import React, { useState } from 'react';
import classes from './Clock.module.scss';

const DEGREASE = 6;

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

  const changeSec = () => setSec(sec + DEGREASE)
  const changeMin = () => setMin(min + DEGREASE)
  const changeHour = () => setHour(hour + DEGREASE)

  setTimeout(changeSec, 1000)
  setTimeout(changeMin, 1000 * 60)
  setTimeout(changeHour, 1000 * 60 * 12)



  return (
    <div className={cls.join(' ')}>
      <div className={classes.hour}>
        <div
          className={classes.hr}
          style={{
            transform: `rotateZ(${hour + min / 12}deg)`,
          }}
        />
      </div>
      <div className={classes.min}>
        <div
          className={classes.mn}
          style={{
            transform: `rotateZ(${min}deg)`,
          }}
        />
      </div>
      <div className={classes.sec}>
        <div
          className={classes.sc}
          style={{
            transform: `rotateZ(${sec}deg)`,
          }}
        />
      </div>
    </div>
  );
}