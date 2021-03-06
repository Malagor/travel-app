import React, {FC} from 'react';


type TDigitalWatchProps = {
  date: Date;
  language: string;
}

export const DigitalWatch: FC<TDigitalWatchProps> = ({date, language}) => {
  const optionsTime: object = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
 };

 console.log('date', date)

 const stringData = date.toLocaleString(language, optionsTime);

 return (
   <div>
     { stringData }
   </div>
 )

}