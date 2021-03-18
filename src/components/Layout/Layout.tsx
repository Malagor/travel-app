import React, { FC } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer, SideBar } from './components';
import { useStyles } from './styled';

type LayoutProps = {
  pathname: string;
};

export const Layout: FC<LayoutProps> = ({ children, pathname }) => {
  const isMobile = window.document.body.offsetWidth < 768;

  const classes = useStyles();
  const [open, setOpen] = React.useState(!isMobile);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        pathname={pathname}
      />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
        <Footer />
      </main>
    </div>
  );
};
