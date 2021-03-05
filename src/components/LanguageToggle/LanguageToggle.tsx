import React, { FC } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import i18n from 'i18next';
import { useDispatch } from 'react-redux';
import { SET_USER_LANGUAGE } from 'appConstants';

export const LanguageToggle: FC = () => {
  const dispatch = useDispatch();

  const updateLang = (lang: string) => {
    dispatch({ type: SET_USER_LANGUAGE, payload: lang });
  };

  return (
    <div>
      <ButtonGroup color="inherit" aria-label="primary button group">
        <Button
          onClick={() => {
            updateLang('en');
            i18n.changeLanguage('en');
          }}
        >
          Eng
        </Button>
        <Button
          onClick={() => {
            updateLang('ru');
            i18n.changeLanguage('ru');
          }}
        >
          Рус
        </Button>
        <Button
          onClick={() => {
            updateLang('be');
            i18n.changeLanguage('be');
          }}
        >
          Бел
        </Button>
      </ButtonGroup>
    </div>
  );
};
