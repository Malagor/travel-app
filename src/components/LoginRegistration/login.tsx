import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import googleLogo from 'assets/svg/google-logo.svg.png';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { database } from 'services';
import { useDispatch } from 'react-redux';
import signInByGoogle from './utils/signInByGoogle';
import { setLoginStatus, setUserInfo } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  wrapperEmail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    minHeight: '400px',
    margin: '40px auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  logo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: 'green',
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4),
  },
  buttonSignIn: {
    margin: theme.spacing(3),
  },
}));

export function Login() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [stateErrorField, setStateErrorField] = React.useState(false);

  const makeLoginEmail = async () => {
    const getLogin = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => error);

    if (getLogin) {
      if (getLogin.operationType === 'signIn') {
        const uid: string = getLogin.user?.uid || '';
        const user = await database.getUserInfo(uid);
        if (user) {
          dispatch(setUserInfo(user));
          dispatch(setLoginStatus(true));
          localStorage.setItem('userId', user.id);
          history.push('/');
        }
      }
    } else {
      setStateErrorField(true);
    }
  };

  const signInByGoogleHandler = async () => {
    const userData = await signInByGoogle();
    if (userData) {
      dispatch(setUserInfo(userData));
      dispatch(setLoginStatus(true));
      localStorage.setItem('userId', userData.id);
      history.push('/');
    }
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.wrapperEmail}>
        <Avatar className={classes.logo}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{t('Registration.signIn')}</Typography>

        <Grid className={classes.inputGroup}>
          <TextField
            error={stateErrorField}
            value={email}
            onChange={handleEmail}
            id="email"
            label={t('Registration.email')}
          />

          <TextField
            error={stateErrorField}
            onChange={handlePassword}
            id="password"
            value={password}
            label={t('Registration.password')}
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid>
          <Typography>{t('Registration.textIsHaveAcc')}</Typography>
          <NavLink to="/registration">
            {t('Registration.createAccount')}
          </NavLink>
        </Grid>
        <Grid>
          <Button onClick={signInByGoogleHandler}>
            <span
              style={{
                width: '20px',
                height: '20px',
                marginTop: '10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${googleLogo})`,
              }}
            />
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={makeLoginEmail}
            variant="contained"
            color="primary"
            disableElevation
            className={classes.buttonSignIn}
          >
            {t('Registration.signIn')}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
