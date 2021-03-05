import React, { FC } from 'react';
import { List } from '@material-ui/core';
import { CURRENCY_MAP } from 'appConstants/currencyMap';

type CurrencyRateViewProps = {
  currentCountry: string;
  rates: [string, number][];
};

export const CurrencyRateView: FC<CurrencyRateViewProps> = ({
  currentCountry,
  rates,
}) => {
  const rateList = rates.map((rate) => (
    <li key={rate[0]}>{`${rate[1]} ${rate[0]}`}</li>
  ));

  return (
    <>
      <h3>{`1 ${CURRENCY_MAP[currentCountry]} =`}</h3>
      <List>{rateList}</List>
    </>
  );
};
