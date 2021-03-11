import React, {FC} from 'react';
import classes from './DateString.module.scss';


type TDateProps = {
  day: string;
  theme: string;
};

export const DateString: FC<TDateProps> = ({day, theme}) => ( 
  <div className={theme === 'light' ? classes.lightTheme : classes.darkTheme}>
    { day }
  </div>
)