import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { State, CountryType } from 'types';
import { loadCountry } from 'store/actions';
import { CountryPageView } from './components/CountryPageView';

export const CountryPage: FC = () => {
  const params: { id: string } = useParams();
  const { id } = params;

  const country: CountryType = useSelector((state: State) => state.country);

  const lang: string = useSelector((state: State) => state.userInfo.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    const countryInfo = loadCountry(id);
    if (!cancel) {
      dispatch(countryInfo);
    }
    return () => {
      cancel = true;
    };
  }, [dispatch, id]);

  return <CountryPageView country={country} lang={lang} />;
};
