import React, { FC } from 'react';
import { ClockWidget, CurrencyRate, Weather } from 'components';
import { useSelector } from 'react-redux';
import { LanguagesType, State } from 'types';
import { Container, Paper } from '@material-ui/core';
import { useStyles } from './styled';

type WidgetsPanelProps = {};

const clockWidgetData = {
  localeCity: {
    name: 'Minsk',
    timezone: 'Europe/Minsk',
  },
  otherCity: {
    name: 'New York',
    timezone: 'America/New_York',
  },
};

export const WidgetsPanel: FC<WidgetsPanelProps> = () => {
  const classes = useStyles();

  const theme = useSelector((state: State) => state.userInfo.theme);
  const lang = useSelector((state: State) => state.userInfo.lang);
  const countryCurrency = useSelector((state: State) => state.country.currency);
  const currencies = useSelector((state: State) => state.userInfo.currencies);
  const city = useSelector((state: State) => state.country.capital);
  const countryName = useSelector((state: State) => state.country.name);

  const weatherLocation = city.en || countryName.en || '';
  const weatherTitle =
    city[lang as keyof LanguagesType] ||
    countryName[lang as keyof LanguagesType] ||
    '';

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Weather location={weatherLocation} title={weatherTitle} />
        <ClockWidget data={clockWidgetData} theme={theme} />
        {countryCurrency && (
          <CurrencyRate
            countryCurrency={countryCurrency}
            preferredCurrencies={currencies}
            lang={lang}
          />
        )}
      </Paper>
    </Container>
  );
};
