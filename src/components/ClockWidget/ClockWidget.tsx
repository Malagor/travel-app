import React, {FC} from 'react';
import { Clock } from './components/Clock/Clock';
import { DigitalWatch } from './components/DigitalWatch/DigitalWatch';
import { DateString } from './components/Date/DateString';
import classes from './ClockWidget.module.scss';



export const ClockWidget = () => {
  const date = new Date();




 /*  const stringData = date.toLocaleString(i18n.language); */

  return (
/*     <div>
      <Clock theme=''/>
      <DigitalWatch date={date} language='en'/>
      <DateString date={date}  language='en'/>
    </div> */



    <div className={classes.wrapper}>
      <div className={classes.wrapperClock}>

        <div className={classes.timeBlock}>
          <h4>localCity</h4>
          <Clock theme=''/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch date={date} language='en'/>
          </div>
        </div>

        <div className={classes.timeBlock}>
          <h4>localCity</h4>
          <Clock theme=''/>
          <div className={classes.timeBlock__time}>
            <DigitalWatch date={date} language='en'/>
          </div>
        </div>

      </div>

        <div className={classes.timeBlock__time}>
          <DateString date={date}  language='en'/>
        </div>
    </div>
  )
}



/* const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/country";
const token = "15b4cefae631f376f819d9987916970e2dd29315";
const query = "Br";

const options: Object = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${token}`
    },
    body: JSON.stringify({query: query})
}

fetch(url, options)
.then(response => response.text())
.then(result => console.log(result)) */