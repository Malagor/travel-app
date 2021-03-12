import React, { FC } from 'react';
import classes from './DateString.module.scss';

type TDateProps = {
  date: {
    dayOfWeek: string;
    monthDayYear: string;
  };
  theme: string;
};

export const DateString: FC<TDateProps> = ({ date, theme }) => (
  <div
    className={`${theme === 'light' ? classes.lightTheme : classes.darkTheme} ${
      classes.wrapper
    }`}
  >
    <div className={classes.day}>{date.dayOfWeek}</div>
    <div>{date.monthDayYear}</div>
  </div>
);
