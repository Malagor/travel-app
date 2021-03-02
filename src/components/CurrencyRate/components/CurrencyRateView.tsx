import React, { FC } from 'react';
import { List, Select } from '@material-ui/core';
import { CURRENCY_MAP } from 'appConstants/currencyMap';

type CurrencyRateViewProps = {
  currentCountry: string;
  rates: number[];
  currencies: string[];
  setCurrencies: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CurrencyRateView: FC<CurrencyRateViewProps> = ({
  currentCountry,
  rates,
  currencies,
  setCurrencies,
}) => {
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

  return (
    <>
      <h3>{`1 ${CURRENCY_MAP[currentCountry]} =`}</h3>
      <List>{rateList}</List>
      <Select
        defaultValue={currencies[currencies.length - 1]}
        native
        onChange={(evt) =>
          setCurrencies(['USD', 'EUR', evt.target.value as string])
        }
      >
        {currencyOptions}
      </Select>
    </>
  );
};
