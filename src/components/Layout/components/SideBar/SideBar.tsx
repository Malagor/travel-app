import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { useSelector } from 'react-redux';
import { LanguagesType, State } from 'types';
import { ClockWidget, CurrencyRate, Weather } from 'components';
import { MenuItems } from '../MenyItems';
import { useStyles } from './styled';

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

export const SideBar: FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const user = useSelector((state: State) => state.userInfo);
  const country = useSelector((state: State) => state.country);

  const location = useLocation();

  const clockWidgetData = {
      name: `${country.name[user.lang as keyof LanguagesType] || ''} / ${
        country.capital[user.lang as keyof LanguagesType] || ''
      }`,
      timezone: country.timeZone,
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <MenuItems />
      <Divider className={classes.divided} />
      {location.pathname !== '/' ? (
        <>
          <ClockWidget data={clockWidgetData} theme={user.theme} />
          <Divider className={classes.divided} />
          <Weather
            title={country.capital[user.lang as keyof LanguagesType] || ''}
            location={country.capital[user.lang as keyof LanguagesType] || ''}
          />
          <Divider className={classes.divided} />
          <CurrencyRate
            countryCurrency={country.currency}
            preferredCurrencies={user.currencies}
            lang={user.lang}
          />
        </>
      ) : null}
    </Drawer>
  );
};
