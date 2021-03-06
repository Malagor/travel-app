import React, {FC} from 'react';

type TDateProps = {
  date: Date;
  language: string;
};

export const DateString: FC<TDateProps> = ({date, language}) => {
  const optionsDate: object = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
 };

const stringData = date.toLocaleString(language, optionsDate);
 

 return (
   <div>
     { stringData }
   </div>
 )

}