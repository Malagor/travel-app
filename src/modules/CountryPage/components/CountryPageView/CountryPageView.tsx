import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { LanguagesType, CountryType, State } from 'types';
import { useSelector } from 'react-redux';
import { VideoPlayer } from '../VideoPlayer';
import { useStyles } from './styled';
import { PhotoGallery } from './components';
import { WidgetsPanel } from './components/WidgetsPanel';

type CountryPageProps = {
  country: CountryType;
  lang: string;
};

export const CountryPageView: FC<CountryPageProps> = ({ country, lang }) => {
  const classes = useStyles();

  const { iso3 } = country;

  const geo = useSelector((state: State) => state.geo[iso3]);
  console.log(`geo ${country.name.ru} =>`, geo);

  console.log('country', country);
  return (
    <Grid container>
      <Grid item xs={8}>
        <Container maxWidth="lg" className={classes.container}>
          {country ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                    <Grid item xs={12} md={7} lg={7}>
                      <VideoPlayer url={country?.videos?.[0] || ''} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {country.attractions && (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <PhotoGallery
                      sliderData={country.attractions}
                      lang={lang}
                    />
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : (
            <Typography variant="h2">Country Page</Typography>
          )}
        </Container>
      </Grid>
      <Grid item xs={4}>
        <WidgetsPanel />
      </Grid>
    </Grid>
  );
};
