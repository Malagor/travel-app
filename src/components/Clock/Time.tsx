import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';


type TCTimeProps = {
  options: object
};

export const Time = (props :TCTimeProps) => {
  const { options } = props;
  const date = new Date();
  const [, i18n] = useTranslation();

  const stringData = date.toLocaleString(i18n.language, options)

  const [data, setData] = useState(date)

  useEffect(() => {
    setTimeout(() => { 
      setData(new Date())
    }, 1000)
  }, [data])

  return (
    <div>
      {stringData}
    </div>
  )
}