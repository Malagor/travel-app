import React, { FC } from 'react';
import firebase from 'firebase';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { LanguageToggle, Search } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'types';
import { useTranslation } from 'react-i18next';
import { setLoginStatus, setUserInfo } from 'store/actions';
import { MOBILE_WIDTH } from 'appConstants';
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
  const isMobile = window.document.body.offsetWidth < MOBILE_WIDTH;

  const classes = useStyles();
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: State) => state.userInfo);
  const isLogin = useSelector((state: State) => state.userIsLogin);

  const singOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(
          setUserInfo({
            ...userInfo,
            id: '',
            name: '',
            avatar: '',
          })
        );
        dispatch(setLoginStatus(false));
      })
      .catch((error) => error);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && !isMobile && classes.appBarShift)}
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

        {isLogin ? (
          <>
            <Avatar
              alt={userInfo.name}
              src={userInfo.avatar}
              className={classes.marginLeft}
            />
            <Typography className={classes.marginLeft}>
              {userInfo.name}
            </Typography>
            <NavLink to="/#" className={classes.marginLeft}>
              <Button
                onClick={singOut}
                variant="contained"
                color="primary"
                disableElevation
              >
                {t('Registration.signOut')}
              </Button>
            </NavLink>
          </>
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
