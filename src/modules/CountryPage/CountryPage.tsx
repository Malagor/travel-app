import React, { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { State, CountryType } from 'types';
import { loadCountry } from 'store/actions';
import { Loader, ErrorMessage } from 'components';
import { CountryPageView } from './components/CountryPageView';

export const CountryPage: FC = () => {
  const params: { id: string } = useParams();
  const { id } = params;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const country: CountryType = useSelector((state: State) => state.country);

  const lang: string = useSelector((state: State) => state.userInfo.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    try {
      const countryInfo = loadCountry(id);
      if (!cancel) {
        dispatch(countryInfo);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
    return () => {
      cancel = true;
    };
  }, [dispatch, id]);

  const hasContent = !(isLoading || isError);
  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasContent && <CountryPageView country={country} lang={lang} />}
    </>
  );
};
