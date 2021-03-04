import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, StateCountry } from 'types';
import * as actions from 'store/actions';
import { Database } from 'services';
import { CountryCard } from './components/CountryCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
  },
}));

type MainPageProps = {
  countryList: StateCountry[];
  setCountriesList: (payload: StateCountry[]) => void;
  setCountry: (payload: StateCountry) => void;
};

const MainPage: FC<MainPageProps> = ({
  countryList,
  setCountriesList,
  setCountry,
}) => {
  const classes = useStyles();
  const database = Database.create();

  useEffect(() => {
    setCountriesList(database.getCountriesList());
  });

  const updateCountryInfo = (id: number) => {
    setCountry(database.getCountryById(id));
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h2">Main Page</Typography>

      <Grid container spacing={3}>
        {countryList.map((country) => (
          <Grid key={country.id} item xs={12} md={6} lg={4}>
            <NavLink
              to={`/country/${country.id}`}
              className={classes.link}
              onClick={() => {
                updateCountryInfo(+country.id);
              }}
            >
              <CountryCard {...country} />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  countryList: state.countryList,
});

const mapActionsToProps = {
  setCountry: actions.setCountry,
  setCountriesList: actions.setCountriesList,
};

export default connect(mapStateToProps, mapActionsToProps)(MainPage);
