import React, { createRef, useContext, useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  wrapperLogin: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    height: '400px',
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
  buttonSingIn: {
    margin: theme.spacing(3),
  },
}));

export function Login() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const makeLogin = () => {
    console.log('login', login);
    console.log('password', password);

    /* firebase.auth.createUserWithEmailAndPassword() */
  };

  const singInByGoogle = () => {
    console.log('singInByGoogle');
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.wrapperLogin}>
        <Avatar className={classes.logo}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sing in</Typography>

        <Grid className={classes.inputGroup}>
          <TextField
            value={login}
            onChange={handleLogin}
            id="loginEnter"
            label="login"
          />

          <TextField
            onChange={handlePassword}
            id="passwordEnter"
            value={password}
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid>
          <Button onClick={singInByGoogle}>
            <span
              style={{
                width: '20px',
                height: '20px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${googleLogo})`,
              }}
            />
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={makeLogin}
            variant="contained"
            color="primary"
            disableElevation
            className={classes.buttonSingIn}
          >
            Sing in
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
