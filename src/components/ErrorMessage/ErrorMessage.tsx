import React, { FC } from 'react';
import { ReactComponent as Tourist } from 'assets/svg/tourist.svg';
import classes from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  locale?: 'en' | 'ru' | 'be';
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ locale= 'be' }) => {
  const massage = {
    en: 'The data was lost somewhere and we sent a lifeguard to search for it.',
    ru: 'Данные где-то потерялись и мы выслали спасателя на их поиски.',
    be: 'Данныя дзесьці згубіліся і мы выслалі выратавальніка на іх пошукі.',
  };

  return (
    <div className={classes.ErrorMessage}>
      <Tourist />
      <p>{massage[locale]}</p>
    </div>
  );
};
