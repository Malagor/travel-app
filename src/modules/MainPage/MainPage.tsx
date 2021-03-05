import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State, StateCountry } from 'types';
import { Database } from 'services';
import { SET_COUNTRIES_LIST } from 'appConstants';
import { CountryCard } from './components/CountryCard';
import { useStyles } from './styled';

export const MainPage: FC = () => {
  const classes = useStyles();
  const database = Database.create();

  const countryList: StateCountry[] = useSelector(
    (state: State) => state.countryList
  );
  const lang = useSelector((state: State) => state.lang);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_COUNTRIES_LIST,
      payload: database.getCountriesList(),
    });
  });

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h2">Main Page</Typography>

      <Grid container spacing={3}>
        {countryList.map((country) => (
          <Grid key={country.id} item xs={12} md={6} lg={4}>
            <NavLink to={`/country/${country.id}`} className={classes.link}>
              <CountryCard country={country} lang={lang} />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
