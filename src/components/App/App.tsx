import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Clock, PointInfoTest } from 'components';

import classes from './App.module.scss';

export function App() {
  const [theme, setTheme] = useState('');
  const [object, setObject] = useState('');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };
  const stylePaper: React.CSSProperties = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    width: '500px',
    margin: '20px'
  };

  const { t } = useTranslation();

  const toggleObject = () => {
    const objKeys = ['W346312699', 'N3660336221', 'W102188799', 'R9095854', 'errorKey', 'errorKey', 'errorKey'];
    const len = objKeys.length;
    const index = Math.floor(Math.random() * len);
    setObject(objKeys[index]);
  };

  return (
    <div className={classes.App}>
      <Paper elevation={3} style={stylePaper}>
        <Clock theme={theme} />
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          {t('Theme toggle')}
        </Button>
        <Button variant="contained" color="secondary" onClick={toggleObject}>
          Change Object
        </Button>
         <PointInfoTest xid={object} />
      </Paper>
    </div>
  );
}
