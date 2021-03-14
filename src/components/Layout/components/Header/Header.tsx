import React, { FC } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { LanguageToggle, Search } from 'components';
import { useSelector } from 'react-redux';
import { State } from 'types';
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
  const userInfo = useSelector((state: State) => state.userInfo);
  const classes = useStyles();

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
        <Avatar
          alt={userInfo.name}
          src={userInfo.avatar}
          style={{ marginLeft: '10px' }}
        />
      </Toolbar>
    </AppBar>
  );
};
