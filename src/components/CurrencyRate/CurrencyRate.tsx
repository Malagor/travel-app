import React, { FC, useState, useEffect } from 'react';
import { CURRENCY_MAP } from 'appConstants/currencyMap';
import { Paper, List } from '@material-ui/core';
import classes from './CurrencyRate.module.scss';

type CurrencyRateProps = {
  currentCountry: string;
};

export const CurrencyRate: FC<CurrencyRateProps> = ({ currentCountry }) => {
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'BYN']);
  const [rates, setRates] = useState<number[]>([]);

  const API_KEY = '4b1c63d88f7f09c5e8b03ab5';
  const baseCurrency = CURRENCY_MAP[currentCountry];
  const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

  useEffect(() => {
    const getCurrencyRateData = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setRates(currencies.map((currency) => data.conversion_rates[currency]));
    };

    getCurrencyRateData();
  }, [currentCountry, apiUrl, currencies]);

  const rateList = rates.map((rate, index) => (
    <li key={rate}>
      {rate} {currencies[index]}
    </li>
  ));

  return (
    <Paper elevation={3} className={classes.currencyRate}>
      <h3 className={classes.currencyRate__header}>
        {`1 ${CURRENCY_MAP[currentCountry]} =`}
      </h3>
      <List>{rateList}</List>
    </Paper>
  );
};
