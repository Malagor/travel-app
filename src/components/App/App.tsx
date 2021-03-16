import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { useDispatch } from 'react-redux';
import { loadGeo, loadUserInfo } from 'store/actions';
import { Layout, Registration, Login } from 'components';
import firebase from 'firebase';
import FIREBASE_CONFIG from 'appConstants/firedaseConfig';

export function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserInfo('5515c398-4dd4-4ac8-9dd5-4783bd889cc3'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGeo());
  }, [dispatch]);

  useEffect(() => {
    firebase.initializeApp(FIREBASE_CONFIG);
  }, []);

  return (
    /* <Registration /> */

    <Layout pathname={location.pathname}>
      <Switch>
        <Route path="/country/:id" component={CountryPage} />
        <Route path="/country" component={CountryPage} />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
      </Switch>
    </Layout>
  );
}
