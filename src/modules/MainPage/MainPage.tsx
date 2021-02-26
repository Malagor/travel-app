import React, { FC } from 'react';
import classes from './MainPage.module.scss';
import { CountryList, PageTitle } from './components';
import { DARK_TEXT_COLOR } from 'appConstants/colors';

type MainPageProps = {};

export const MainPage: FC<MainPageProps> = () => {
  return (
    <div className={classes.MainPage}>
      <PageTitle />
      <CountryList color={DARK_TEXT_COLOR} />
    </div>
  );
};


