import React, { FC, useState, useEffect } from 'react';
import { CURRENCY_MAP } from 'appConstants/currencyMap';
import { Loader, ErrorMessage } from 'components';
import { Paper, List, Select } from '@material-ui/core';
import classes from './CurrencyRate.module.scss';

type CurrencyRateProps = {
  currentCountry: string;
};

export const CurrencyRate: FC<CurrencyRateProps> = ({ currentCountry }) => {
  const [currencies, setCurrencies] = useState<string[]>(['USD', 'EUR', 'BYN']);
  const [rates, setRates] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = '4b1c63d88f7f09c5e8b03ab5';
  const baseCurrency = CURRENCY_MAP[currentCountry];
  const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const getCurrencyRateData = () =>
      fetch(apiUrl)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('response error');
          }
          return resp.json();
        })
        .then((data) => {
          setIsLoading(false);
          setRates(
            currencies.map((currency) => data.conversion_rates[currency])
          );
          return data;
        });

    setIsError(false);
    setIsLoading(true);
    getCurrencyRateData().catch(onError);
  }, [currentCountry, apiUrl, currencies]);

  const rateList = rates.map((rate, index) => (
    <li key={rate}>
      {rate} {currencies[index]}
    </li>
  ));

  const currencyOptions = Object.values(CURRENCY_MAP)
    .filter((currency) => currency !== 'USD' && currency !== 'EUR')
    .map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));

  function handleSelectChange(
    evt: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    const newCurrency = evt.target.value;
    if (typeof newCurrency === 'string') {
      setCurrencies(['USD', 'EUR', newCurrency]);
    }
  }

  const drawCurrencyRates = () => (
    <>
      <h3 className={classes.currencyRate__header}>
        {`1 ${CURRENCY_MAP[currentCountry]} =`}
      </h3>
      <List>{rateList}</List>
      <Select
        defaultValue={currencies[currencies.length - 1]}
        native
        onChange={handleSelectChange}
      >
        {currencyOptions}
      </Select>
    </>
  );

  const hasData = !(isError || isLoading);

  return (
    <Paper elevation={3} className={classes.currencyRate}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && drawCurrencyRates()}
    </Paper>
  );
};
