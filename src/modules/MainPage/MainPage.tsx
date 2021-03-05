import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, StateCountry } from 'types';
import * as actions from 'store/actions';
import { Database } from 'services';
import { CountryCard } from './components/CountryCard';
import { useStyles } from './styled';

type MainPageProps = {
  countryList: StateCountry[];
  lang: string;
  setCountriesList: (payload: StateCountry[]) => void;
};

const MainPage: FC<MainPageProps> = ({
  countryList,
  setCountriesList,
  lang,
}) => {
  const classes = useStyles();
  const database = Database.create();

  useEffect(() => {
    setCountriesList(database.getCountriesList());
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

const mapStateToProps = (state: State) => ({
  countryList: state.countryList,
  lang: state.lang,
});

const mapActionsToProps = {
  setCountriesList: actions.setCountriesList,
};

export default connect(mapStateToProps, mapActionsToProps)(MainPage);
