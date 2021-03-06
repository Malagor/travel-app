import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { ClockWidget } from 'components/ClockWidget'; // delete
import { Layout } from '../Layout/Layout';



export function App() {
  return (
    <div>
      <ClockWidget />
    </div>

/*     <Layout>
       <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout> */
  );
}
