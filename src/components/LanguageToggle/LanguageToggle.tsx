import React, { FC } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import i18n from 'i18next';

export const LanguageToggle: FC = () => (
  <div>
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={() => i18n.changeLanguage('en')}>Eng</Button>
      <Button onClick={() => i18n.changeLanguage('ru')}>Рус</Button>
      <Button onClick={() => i18n.changeLanguage('be')}>Бел</Button>
    </ButtonGroup>
  </div>
);
