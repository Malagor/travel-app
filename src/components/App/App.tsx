import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { useDispatch } from 'react-redux';
import { loadGeo, loadUserInfo } from 'store/actions';
import { Layout } from 'components';

export function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserInfo('5515c398-4dd4-4ac8-9dd5-4783bd889cc3'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGeo());
  }, [dispatch]);

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
