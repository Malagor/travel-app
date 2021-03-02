import React, { FC, useState, useEffect, useCallback } from 'react';
import { CURRENCY_MAP } from 'appConstants/currencyMap';
import { CURRENCY_API_KEY } from 'appConstants/api';
import { Loader, ErrorMessage } from 'components';
import { Paper } from '@material-ui/core';
import { CurrencyRatesInfo } from 'types';
import classes from './CurrencyRate.module.scss';
import { CurrencyRateView } from './components/CurrencyRateView';

type CurrencyRateProps = {
  currentCountry: string;
};

export const CurrencyRate: FC<CurrencyRateProps> = ({ currentCountry }) => {
  const [currencies, setCurrencies] = useState<string[]>(['USD', 'EUR', 'BYN']);
  const [rates, setRates] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const baseCurrency = CURRENCY_MAP[currentCountry];
  const apiUrl = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/${baseCurrency}`;

  const storeCurrencyData = useCallback(
    (data: CurrencyRatesInfo) => {
      const updateTime = new Date(data.time_last_update_utc);
      const updateDate = `${updateTime.getDate()}-${updateTime.getMonth()}-${updateTime.getFullYear()}`;

      const currentRates = {
        update: updateDate,
        rates: data.conversion_rates,
      };

      const storageData = localStorage.getItem('TA-currency');

      if (storageData) {
        const parsedStorageData = JSON.parse(storageData);
        parsedStorageData[currentCountry] = currentRates;
        localStorage.setItem('TA-currency', JSON.stringify(parsedStorageData));
      } else {
        const newStorageData = { [currentCountry]: currentRates };
        localStorage.setItem('TA-currency', JSON.stringify(newStorageData));
      }
    },
    [currentCountry]
  );

  const getCurrencyRateData = useCallback(
    () =>
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
          storeCurrencyData(data);

          return data;
        }),
    [apiUrl, currencies, storeCurrencyData]
  );

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const setRatesFromStore = useCallback(
    (data: string) => {
      const parsedStorageData = JSON.parse(data);
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
    },
    [currencies, currentCountry, getCurrencyRateData]
  );

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    const storageData = localStorage.getItem('TA-currency');
    if (storageData) {
      setRatesFromStore(storageData);
    } else {
      getCurrencyRateData().catch(onError);
    }
  }, [
    currentCountry,
    apiUrl,
    currencies,
    getCurrencyRateData,
    setRatesFromStore,
  ]);

  const hasData = !(isError || isLoading);

  return (
    <Paper elevation={3} className={classes.currencyRate}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && (
        <CurrencyRateView
          currentCountry={currentCountry}
          currencies={currencies}
          setCurrencies={setCurrencies}
          rates={rates}
        />
      )}
    </Paper>
  );
};
