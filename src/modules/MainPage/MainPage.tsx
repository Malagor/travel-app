import React, { FC, useEffect, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State, CountryType, LanguagesType } from 'types';
import { database } from 'services/database';
import { setCountriesList, setFirstCardRef } from 'store/actions';
import Paper from '@material-ui/core/Paper';
import { CountryCard } from './components/CountryCard';
import { useStyles } from './styled';

export const MainPage: FC = () => {
  const classes = useStyles();

  const countryList: CountryType[] = useSelector(
    (state: State) => state.countryList
  );
  const lang = useSelector((state: State) => state.userInfo.lang);
  const search = useSelector((state: State) => state.search);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const filteredCountryList = countryList.filter((country) => {
    const searchString = search.toLowerCase().trim();
    return (
      country.name[lang as keyof LanguagesType]!.toLowerCase().includes(
        searchString
      ) ||
      country.capital[lang as keyof LanguagesType]!.toLowerCase().includes(
        searchString
      )
    );
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCountriesList(database.getCountriesList()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFirstCardRef(firstCardRef));
  }, [dispatch, firstCardRef]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h2">Main Page</Typography>

        <Grid container spacing={3}>
          {filteredCountryList.map((country, index) => (
            <Grid
              key={country.id}
              item
              xs={12}
              md={6}
              lg={4}
              ref={index === 0 ? firstCardRef : null}
            >
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
