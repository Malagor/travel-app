import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import { State, StateCountry } from 'types';

import { connect } from 'react-redux';

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

type CountryPageProps = {
  country: StateCountry | {};
};

const CountryPage: FC<CountryPageProps> = ({ country }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      {country ? (
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2">{country?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <img
                    className={classes.image}
                    src={country?.photos[0]}
                    alt={country?.name.ru}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <p>{country?.description}</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h2">Country Page</Typography>
      )}

      {/* <Paper className={classes.paper}> */}
      {/*  <Grid container spacing={3}> */}
      {/*    <Grid item xs={12}> */}
      {/*      <Typography variant="h2">{country?.name.ru}</Typography> */}
      {/*    </Grid> */}
      {/*    <Grid item xs={12}> */}
      {/*      <Grid container spacing={3}> */}
      {/*        <Grid item xs={12} md={6} lg={4}> */}
      {/*          <img */}
      {/*            className={classes.image} */}
      {/*            src={country?.photos[0]} */}
      {/*            alt={country.name.ru} */}
      {/*          /> */}
      {/*        </Grid> */}
      {/*        <Grid item xs={12} md={6} lg={8}> */}
      {/*          <p>{country?.description}</p> */}
      {/*        </Grid> */}
      {/*      </Grid> */}
      {/*    </Grid> */}
      {/*  </Grid> */}
      {/* </Paper> */}
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  country: state.country,
});

export default connect(mapStateToProps)(CountryPage);
