import React from 'react';
import { ClockWidget } from 'components/ClockWidget';
import { Route, Switch } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { Layout } from '../Layout/Layout';

const data = {
  localeCity: {
    name: 'Minsk',
    timezone:'Europe/Minsk',
    
  },
  otherCity: {
    name: 'New York',
    timezone: 'America/New_York'
  }
}

export function App() {
  return (
    <ClockWidget data={data} theme='light'/>
/*     <Layout>
      <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout> */
  );
}
