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

          const updateTime = new Date(data.time_last_update_utc);
          const updateDate = `${updateTime.getDate()}-${updateTime.getMonth()}-${updateTime.getFullYear()}`;

          const currentRates = {
            update: updateDate,
            rates: data.conversion_rates,
          };

          const storageData = localStorage.getItem('TA-currency');

          if (typeof storageData === 'string') {
            const parsedStorageData = JSON.parse(storageData);
            parsedStorageData[currentCountry] = currentRates;
            localStorage.setItem(
              'TA-currency',
              JSON.stringify(parsedStorageData)
            );
          } else {
            const newStorageData = { [currentCountry]: currentRates };
            localStorage.setItem('TA-currency', JSON.stringify(newStorageData));
          }

          return data;
        });

    setIsError(false);
    setIsLoading(true);

    const storageData = localStorage.getItem('TA-currency');
    if (typeof storageData === 'string') {
      const parsedStorageData = JSON.parse(storageData);
      const now = new Date();
      const currentDate = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
      if (
        parsedStorageData[currentCountry] &&
        parsedStorageData[currentCountry].update === currentDate
      ) {
        setRates(
          currencies.map(
            (currency) => parsedStorageData[currentCountry].rates[currency]
          )
        );
        setIsError(false);
        setIsLoading(false);
      } else {
        getCurrencyRateData().catch(onError);
      }
    } else {
      getCurrencyRateData().catch(onError);
    }
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
      <h3>{`1 ${CURRENCY_MAP[currentCountry]} =`}</h3>
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
