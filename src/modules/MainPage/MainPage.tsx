import React, { FC, useEffect, useRef, useState } from 'react';

import { Grid, Paper, Container, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { State, CountryType } from 'types';
import { setFirstCardRef, loadCountryList, setCountry } from 'store/actions';
import { ErrorMessage, Loader } from 'components';
import { COUNTRY_PER_PAGE } from 'appConstants';
import { CountryCard } from './components';
import { useStyles } from './styled';

export const MainPage: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const countryList: CountryType[] = useSelector(
    (state: State) => state.countryList
  );
  const lang = useSelector((state: State) => state.userInfo.lang);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const count = COUNTRY_PER_PAGE;
  const offset = useSelector((state: State) => state.offset);
  const filter = useSelector((state: State) => state.search);

  const dispatch = useDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const clearCountry: CountryType = {
      id: '',
      iso3: '',
      name: {},
      capital: {},
      currency: '',
      timeZone: '',
    };
    dispatch(setCountry(clearCountry));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFirstCardRef(firstCardRef));
  }, [dispatch, firstCardRef]);

  useEffect(() => {
    try {
      const options = {
        offset,
        count,
        filter,
        lang,
      };
      dispatch(loadCountryList(options));
      setIsLoading(false);
    } catch (e) {
      onError();
    }
  }, [dispatch, count, lang, filter, offset]);

  const hasContent = !(isLoading || isError);
  return (
    <Container maxWidth="lg" className={classes.container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasContent && (
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            {countryList.length !== 0 ? (
              countryList.map((country, index) => (
                <Grid
                  key={country.id}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  ref={index === 0 ? firstCardRef : null}
                >
                  <NavLink
                    to={`/country/${country.id}`}
                    className={classes.link}
                  >
                    <CountryCard country={country} lang={lang} />
                  </NavLink>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={6} lg={4}>
                <Typography variant="body1">
                  {t('Nothing Was Found')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};
