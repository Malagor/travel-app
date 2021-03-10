import React from 'react';
import { ClockWidget } from 'components/ClockWidget';
import { Route, Switch } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';

import { Layout } from '../Layout/Layout';




export function App() {
  return (
    <ClockWidget theme='light'/>
/*     <Layout>
       <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout> */
  );
}
