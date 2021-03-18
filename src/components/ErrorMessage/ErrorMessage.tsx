import React, { FC } from 'react';
import { ReactComponent as Tourist } from 'assets/svg/tourist.svg';
import { useTranslation } from 'react-i18next';
import { ErrorMessageStyled } from './styled';

export const ErrorMessage: FC = () => {
  const { t } = useTranslation();
  return (
    <ErrorMessageStyled>
      <Tourist />
      <div>{t('Error Message')}</div>
    </ErrorMessageStyled>
  );
};
