import React, { FC } from 'react';
import { ClockWidget, CurrencyRate } from 'components';
import { useSelector } from 'react-redux';
import { State } from 'types';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styled';

type WidgetsPanelProps = {};

// input data for ClockWidget should pass in props
const data = {
  localeCity: {
    name: "Minsk",
    timezone: 'Europe/Minsk'
    
  },
  otherCity: {
    name: "New York",
    timezone: 'America/New_York'
  }
}

export const WidgetsPanel: FC<WidgetsPanelProps> = () => {
  const classes = useStyles();
  const theme = useSelector((state: State) => state.settings.theme);
  const currencies = useSelector((state: State) => state.settings.currencyList);

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <ClockWidget data={data} theme={theme} />
        <CurrencyRate
          currentCountry="russia"
          preferredCurrencies={Object.keys(currencies)}
        />
      </Paper>
    </Container>
  );
};
