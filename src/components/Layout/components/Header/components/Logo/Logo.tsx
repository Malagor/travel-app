import React, { FC } from "react";
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import classes from './Logo.module.scss';

export const Logo: FC = () => (
    <NavLink to="/" className={classes.logo}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        Go-Go Travel
      </Typography>
    </NavLink>
  );
