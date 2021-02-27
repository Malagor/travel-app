import React, { useState } from 'react';
import {Clock, Loader} from 'components';
import { Button, Paper } from '@material-ui/core';
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
    height: '500px'
  };

  return (
    <div className={classes.App}>
      <Paper elevation={3} style={styleBtn}>
        <Loader />
        <Clock theme={theme} />
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          Theme toggle
        </Button>
      </Paper>
    </div>
  );
}
