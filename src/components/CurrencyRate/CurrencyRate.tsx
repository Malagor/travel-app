import React, { FC, useState, useEffect, useCallback } from 'react';
import { CURRENCY_API_KEY } from 'appConstants/api';
import { Loader, ErrorMessage } from 'components';
import { Paper } from '@material-ui/core';
import { CurrencyRatesInfo } from 'types';
import classes from './CurrencyRate.module.scss';
import { CurrencyRateView } from './components/CurrencyRateView';

type CurrencyRateProps = {
  countryCurrency: string;
  preferredCurrencies: string[];
  lang: string;
};

export const CurrencyRate: FC<CurrencyRateProps> = ({
  countryCurrency,
  preferredCurrencies,
  lang,
}) => {
  const [rates, setRates] = useState<[string, number][]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/${countryCurrency}`;

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
        parsedStorageData[countryCurrency] = currentRates;
        localStorage.setItem('TA-currency', JSON.stringify(parsedStorageData));
      } else {
        const newStorageData = { [countryCurrency]: currentRates };
        localStorage.setItem('TA-currency', JSON.stringify(newStorageData));
      }
    },
    [countryCurrency]
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
            preferredCurrencies.map((currency) => [
              currency,
              data.conversion_rates[currency],
            ])
          );
          storeCurrencyData(data);

          return data;
        }),
    [apiUrl, preferredCurrencies, storeCurrencyData]
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
        parsedStorageData[countryCurrency] &&
        parsedStorageData[countryCurrency].update === currentDate
      ) {
        setRates(
          preferredCurrencies.map((currency) => [
            currency,
            parsedStorageData[countryCurrency].rates[currency],
          ])
        );
        setIsError(false);
        setIsLoading(false);
      } else {
        getCurrencyRateData().catch(onError);
      }
    },
    [preferredCurrencies, countryCurrency, getCurrencyRateData]
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
    countryCurrency,
    apiUrl,
    preferredCurrencies,
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
          countryCurrency={countryCurrency}
          rates={rates}
          lang={lang}
        />
      )}
    </Paper>
  );
};
