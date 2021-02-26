import React, { useState } from 'react';
import { Clock } from 'components';
import classes from './App.module.scss'

export function App() {
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };
  return (
    <div className={classes.App}>
      <Clock theme={theme} />
      <button type="button" onClick={toggleTheme} className={classes.themeBtn}>
        Theme toggle
      </button>
    </div>
  );
}
