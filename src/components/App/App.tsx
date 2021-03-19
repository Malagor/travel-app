import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage, CountryPage } from 'modules';
import { useDispatch, useSelector } from 'react-redux';
import { loadGeo, loadUserInfo, setLoginStatus } from 'store/actions';
import { Layout, Registration, Login } from 'components';
import firebase from 'firebase';
import FIREBASE_CONFIG from 'appConstants/firedaseConfig';
import i18n from 'i18next';
import { State } from 'types';

export function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId') || null;
  const lang = useSelector((state: State) => state.userInfo.lang);

  useEffect(() => {
    if (userId) {
      dispatch(loadUserInfo(userId));
      dispatch(setLoginStatus(true));
      i18n.changeLanguage(lang);
    }
  }, [dispatch, userId, lang]);

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
