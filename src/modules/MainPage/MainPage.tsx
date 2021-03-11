import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State, CountryType } from 'types';
import { loadCountryList } from 'store/actions';
import Paper from '@material-ui/core/Paper';
import { CountryCard } from './components/CountryCard';
import { useStyles } from './styled';

export const MainPage: FC = () => {
  const classes = useStyles();

  const countryList: CountryType[] = useSelector(
    (state: State) => state.countryList
  );
  const lang = useSelector((state: State) => state.userInfo.lang);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setCountriesList(database.getCountriesList()));
  // }, [dispatch]);


  useEffect(() => {
    dispatch(loadCountryList())
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
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
      </Paper>
    </Container>
  );
};
