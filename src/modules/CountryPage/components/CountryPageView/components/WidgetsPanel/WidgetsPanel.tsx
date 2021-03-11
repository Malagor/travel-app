import React, { FC } from 'react';
import { /* Clock, */ CurrencyRate } from 'components';
import { useSelector } from 'react-redux';
import { State } from 'types';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styled';

type WidgetsPanelProps = {};

export const WidgetsPanel: FC<WidgetsPanelProps> = () => {
  const classes = useStyles();
  const theme = useSelector((state: State) => state.settings.theme);
  const currencies = useSelector((state: State) => state.settings.currencyList);

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
       {/*  <Clock theme={theme} /> */}
        <CurrencyRate
          currentCountry="russia"
          preferredCurrencies={Object.keys(currencies)}
        />
      </Paper>
    </Container>
  );
};
