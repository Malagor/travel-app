import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavLink } from 'react-router-dom';
import { List } from '@material-ui/core';

const styles = {
  color: 'black',
};

export const MenuItems: FC = () => {
  const { t } = useTranslation();

  return (
    <List>
      <NavLink to="/" exact={true} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('Main')} style={styles} />
        </ListItem>
      </NavLink>
    </List>
  );
};
