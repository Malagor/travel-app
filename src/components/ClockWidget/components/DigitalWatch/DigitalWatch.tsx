import React, {FC} from 'react';
import classes from './DigitalWatch.module.scss';

type TDigitalWatchProps = {
  time: string;
  theme: string;
}

export const DigitalWatch: FC<TDigitalWatchProps> = ({time, theme}) => (
  <div className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>
    { time }
  </div>
)