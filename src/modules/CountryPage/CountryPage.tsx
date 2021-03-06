import React, { FC, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Database } from 'services';

import { State, StateCountry } from 'types';
import { setCountry } from 'store/actions';
import { CountryPageView } from './components/CountryPageView';

export const CountryPage: FC = () => {
  const database = Database.create();
  const params: { id: string } = useParams();
  const { id } = params;

  const country: StateCountry = useSelector((state: State) => state.country);
  const lang: string = useSelector((state: State) => state.userInfo.lang);
  const dispatch = useDispatch();

  const updateCountryInfo = useCallback(
    (idx: number) => {
      dispatch(setCountry(database.getCountryById(idx)));
    },
    [database, dispatch]
  );

  useEffect(() => {
    updateCountryInfo(+id - 1);
  }, [updateCountryInfo, id]);

  return <CountryPageView country={country} lang={lang} />;
};
