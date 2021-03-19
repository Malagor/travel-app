import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { useDispatch } from 'react-redux';
import { loadGeo, loadUserInfo, setLoginStatus } from 'store/actions';
import { Layout, Registration, Login } from 'components';
import firebase from 'firebase';
import FIREBASE_CONFIG from 'appConstants/firedaseConfig';

export function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId') || null;

  useEffect(() => {
    if (userId) {
      dispatch(loadUserInfo(userId));
      dispatch(setLoginStatus(true));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    try {
      dispatch(loadGeo());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    firebase.initializeApp(FIREBASE_CONFIG);
  }, []);

  return (
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
