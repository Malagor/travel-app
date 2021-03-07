import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { LanguagesType, StateCountry } from 'types';
import { useStyles } from './styled';

type CountryPageProps = {
  country: StateCountry;
  lang: string;
};

export const CountryPageView: FC<CountryPageProps> = ({ country, lang }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      {country ? (
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2">
                {country?.name[lang as keyof LanguagesType]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {country?.photos && (
                  <Grid item xs={12} md={6} lg={4}>
                    <img
                      className={classes.image}
                      src={country?.photos[0]}
                      alt={country?.name[lang as keyof LanguagesType]}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6} lg={8}>
                  <p>
                    {country?.description &&
                      country.description[lang as keyof LanguagesType]}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h2">Country Page</Typography>
      )}
    </Container>
  );
};
