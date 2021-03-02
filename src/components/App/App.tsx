import React, { useState } from 'react';
import { ClockWidget, Weather, ErrorMessage, LanguageToggle } from 'components';
import { Button, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import classes from './App.module.scss';

export function App() {
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };
  const styleBtn: React.CSSProperties = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    width: '500px',
    margin: '20px',
  };

  const { t } = useTranslation();

  return (
    <div className={classes.App}>
      <Weather city="Minsk" />
      <Paper elevation={3} style={styleBtn}>
        <ClockWidget theme={theme} />
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          {t('Theme toggle')}
        </Button>
        <LanguageToggle />
        <ErrorMessage />
      </Paper>
    </div>
  );
}
