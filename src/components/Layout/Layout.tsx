import React, { FC } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer, SideBar } from './components';
import { useStyles } from './styled';

export const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
        <Footer />
      </main>
    </div>
  );
};
