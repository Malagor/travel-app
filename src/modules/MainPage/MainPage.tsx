import React, { FC, useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State, CountryType } from 'types';
import { loadCountryList } from 'store/actions';
import Paper from '@material-ui/core/Paper';
import { ErrorMessage, Loader } from 'components';
import { COUNTRY_PER_PAGE } from 'appConstants';
import { CountryCard } from './components';
import { useStyles } from './styled';

export const MainPage: FC = () => {
  const classes = useStyles();

  const countryList: CountryType[] = useSelector(
    (state: State) => state.countryList
  );
  const lang = useSelector((state: State) => state.userInfo.lang);
  const count = COUNTRY_PER_PAGE;
  const offset = useSelector((state: State) => state.offset);
  const filter = '';

  const dispatch = useDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const options = {
        offset,
        count,
        filter,
        lang,
      };

      dispatch(loadCountryList(options));
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
      setIsLoading(false);
  }, [dispatch, count, lang, filter, offset]);

  const hasContent = !(isLoading || isError);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {hasContent && (
          <Grid container spacing={3}>
            {countryList.map((country) => (
              <Grid key={country.id} item xs={12} md={6} lg={4}>
                <NavLink to={`/country/${country.id}`} className={classes.link}>
                  <CountryCard country={country} lang={lang} />
                </NavLink>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};
