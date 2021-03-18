import React, { FC } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { LanguageToggle, Search } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'types';
import { database } from 'services';
import i18n from 'i18n';
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

  const userInfo = useSelector((state: State) => state.userInfo);
  const classes = useStyles();
  const isLogin = useSelector((state: State) => state.userIsLogin);

  const dispatch = useDispatch();

  const loginHandler = async () => {
    try{
      const user = await database.createUser('', '', i18n.language );
      dispatch(setUserInfo(user));
      dispatch(setLoginStatus(true));
    } catch (e) {
      console.log('User create Error!', e);
    }
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
        {isLogin && <Typography>{userInfo.name}</Typography>}
        <Button
          variant="outlined"
          className={classes.loginButton}
          onClick={loginHandler}
        >
          {isLogin ? 'Выйти' : 'Войти'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
