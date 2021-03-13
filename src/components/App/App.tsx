import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { useDispatch } from 'react-redux';
import { loadUserInfo } from 'store/actions';
import { Layout } from 'components';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserInfo('5515c398-4dd4-4ac8-9dd5-4783bd889cc3'));
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Layout>
  );
}
