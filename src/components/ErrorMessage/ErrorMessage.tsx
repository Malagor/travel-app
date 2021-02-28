import React, { FC } from 'react';
import { ReactComponent as Tourist } from 'assets/svg/tourist.svg';
import { useTranslation } from 'react-i18next';
import classes from './ErrorMessage.module.scss';

export const ErrorMessage: FC = () => {

  const { t } = useTranslation();
  return (
    <div className={classes.errorMessage}>
      <Tourist />
      <p>{t('Error Message')}</p>
    </div>
  );
};
