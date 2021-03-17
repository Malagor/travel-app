import React, { FC } from 'react';
import firebase from 'firebase';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { LanguageToggle, Search } from 'components';
import { useSelector } from 'react-redux';
import { State } from 'types';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styled';
import { Logo } from './components/Logo';

type HeaderProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  pathname: string;
};

export const Header: FC<HeaderProps> = ({
  open,
  handleDrawerOpen,
  pathname,
}) => {
  const [t] = useTranslation();

  const userInfo = useSelector((state: State) => state.userInfo);
  const classes = useStyles();
  const isUser = false; // значение из стейта есть юзер илил нет

  const singOut = async () => {
    console.log('singOut');
    const getSingOut = await firebase
      .auth()
      .signOut()
      .then((error) => {
        console.log('error', error);
      });

    console.log('getSingOut', getSingOut);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Logo />
        <div className={classes.grow} />
        {pathname === '/' && <Search />}
        <LanguageToggle />

        {isUser ? (
          <NavLink to="/#" style={{ textDecoration: 'none' }}>
            <Button
              onClick={singOut}
              variant="contained"
              color="primary"
              disableElevation
            >
              {t('Registration.signOut')}
            </Button>
          </NavLink>
        ) : (
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" disableElevation>
              {t('Registration.signIn')}
            </Button>
          </NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
};
