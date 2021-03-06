import React, { FC, useEffect } from 'react';
import { State, StateCountry } from 'types';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Database } from 'services';

import * as actions from 'store/actions';
import { CountryPageView } from './components/CountryPageView';

type CountryPageProps = {
  country: StateCountry;
  setCountry: (payload: StateCountry) => void;
  lang: string;
};

const CountryPageOld: FC<CountryPageProps> = ({
  country,
  setCountry,
  lang,
}) => {
  const database = Database.create();
  const params: { id: string } = useParams();
  const { id } = params;

  const updateCountryInfo = (idx: number) => {
    setCountry(database.getCountryById(idx));
  };

  useEffect(() => {
    updateCountryInfo(+id - 1);
  });

  return <CountryPageView country={country} lang={lang} />;
};

const mapStateToProps = (state: State) => ({
  country: state.country,
  lang: state.userInfo.lang,
});

const mapActionsToProps = {
  setCountry: actions.setCountry,
};

export default connect(mapStateToProps, mapActionsToProps)(CountryPageOld);
