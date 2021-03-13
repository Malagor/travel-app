import React, { FC } from 'react';
import { ClockWidget, CurrencyRate, Weather } from 'components';
import { useSelector } from 'react-redux';
import { LanguagesType, State } from 'types';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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
  const currencies = useSelector((state: State) => state.userInfo.currencyList);
  const lang = useSelector((state: State) => state.userInfo.lang);
  const city: string | undefined = useSelector(
    (state: State) => state.country.capital[lang as keyof LanguagesType]
  );
  const countryName = useSelector(
    (state: State) => state.country.name[lang as keyof LanguagesType]
  );

  const weatherLocation: string = city || countryName || '';
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Weather city={weatherLocation} />
        <ClockWidget data={clockWidgetData} theme={theme} />
        {/* <CurrencyRate */}
        {/* currentCountry="russia" */}
        {/* preferredCurrencies={currencies} */}
        {/* /> */}
      </Paper>
    </Container>
  );
};
