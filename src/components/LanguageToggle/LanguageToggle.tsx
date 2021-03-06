import React, { FC } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import i18n from 'i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from 'store/actions';

export const LanguageToggle: FC = () => {
  const dispatch = useDispatch();

  const updateLang = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div>
      <ButtonGroup color="inherit" aria-label="primary button group">
        <Button
          onClick={() => {
            i18n.changeLanguage('en');
            updateLang('en');
          }}
        >
          Eng
        </Button>
        <Button
          onClick={() => {
            i18n.changeLanguage('ru');
            updateLang('ru');
          }}
        >
          Рус
        </Button>
        <Button
          onClick={() => {
            i18n.changeLanguage('be');
            updateLang('be');
          }}
        >
          Бел
        </Button>
      </ButtonGroup>
    </div>
  );
};
