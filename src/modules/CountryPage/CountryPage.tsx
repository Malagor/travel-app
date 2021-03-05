import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import { CountryCardProps } from 'types';
import { PhotoGallery } from './components';
import { countryPictures } from './mockupCountryPictures';

import { countries } from '../MainPage/mockupDataCountries';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  image: {
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}));

export const CountryPage: FC = () => {
  const [countryData, setCountryData] = useState<CountryCardProps>(
    () => countries[0]
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setCountryData(countries[+id - 1]);
  }, [id]);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      {countryData ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h2">{countryData.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                      <img
                        className={classes.image}
                        src={countryData.image}
                        alt={countryData.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                      <p>{countryData.description}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <PhotoGallery pictures={countryPictures} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h2">Country Page</Typography>
      )}
    </Container>
  );
};
