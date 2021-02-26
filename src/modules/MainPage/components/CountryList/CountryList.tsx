import React, { FC, useState } from 'react';
import classes from './CountryList.module.scss';

type TCountryListProps = {
  color: string;
};

export const CountryList: FC<TCountryListProps> = (props) => {
  const { color } = props;
  const [size, setSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.6);

  const changeSize = () => {
    let locSize: number = size;
    console.log('Hi', locSize);
    setSize(locSize);
  };

  return (
    <div
      className={classes.CountryList}
      style={{ color: color, fontSize: `${size}px`, lineHeight: lineHeight }}
    >
      CountryList
      <button type={'button'} onClick={changeSize}>
        Увеличить
      </button>
    </div>
  );
};
