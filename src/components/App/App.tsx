import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { Layout } from '../Layout/Layout';

export function App() {
  const location = useLocation();

  return (
    <Layout pathname={location.pathname}>
      <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
}
