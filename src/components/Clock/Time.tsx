import React, {useState, useEffect} from 'react';


type TCTimeProps = {
  options: object
};

export const Time = (props :TCTimeProps) => {
  const { options } = props
  const date = new Date();

  const stringData = date.toLocaleString("by", options)

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