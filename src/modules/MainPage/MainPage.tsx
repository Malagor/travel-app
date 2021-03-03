import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { CountryCard } from './components/CounrtyCard';
import { countries } from './mockupCountries';

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
    textDecoration: 'none'
  }
}));

export const MainPage: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h2">Main Page</Typography>

      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid key={country.id} item xs={12} md={6} lg={4}>
            <NavLink to={`/country/${country.id}`} className={classes.link}>
              <CountryCard {...country} />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
