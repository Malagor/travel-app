import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import 'firebase/auth';
import { MIN_LENGTH_PASSWORD } from 'appConstants/index';
import googleLogo from 'assets/svg/google-logo.svg.png';
import singInByGoogle from './utils/singInByGoogle';

const useStyles = makeStyles((theme) => ({
  wrapperEmail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    minHeight: '500px',
    margin: '40px auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  wrapperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: 'green',
    margin: theme.spacing(4),
    marginLeft: '0px',
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
  inputText: {
    margin: theme.spacing(2),
  },
  imageIcon: {
    width: '20px',
    height: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export const Registration = () => {
  const [t] = useTranslation();
  const [state, setState] = React.useState({
    email: '',
    name: '',
    password: '',
  });

  const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked);
  };

  const createAccountByEmail = async () => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password);

    console.log('user', user);
    if (user) {
      console.log('uid', user.uid);
      // go to DB
    }
  };

  const [stateValidationField, setStateValidationField] = React.useState({
    email: false,
    name: false,
    password: false,
  });

  const validationForm = (): void => {
    let email = false;
    let name = false;
    let password = false;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(state.email).toLowerCase());

    isValidEmail ? (email = false) : (email = true);
    state.name ? (name = false) : (name = true);

    if (state.password.length > MIN_LENGTH_PASSWORD) {
      password = false;
    } else {
      password = true;
    }

    setStateValidationField({ ...stateValidationField, email, name, password });

    if (!email && !name && !password) {
      console.log('go create acc');
      createAccountByEmail().catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          setStateValidationField({ ...stateValidationField, ['email']: true });
        } else {
          console.log('Error_code', e.code);
          console.log('Error', e);
        }
      });
    }
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.wrapperEmail}>
        <Grid container>
          <Grid item xs={12} className={classes.wrapperContainer}>
            <Avatar className={classes.logo}>
              <PlaylistAddCheckIcon />
            </Avatar>
            <Typography variant="h5">{t('Registration.signUp')}</Typography>
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.name}
              onChange={handleState}
              value={state.name}
              name="name"
              label={t('Registration.name')}
              className={classes.inputText}
            />
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.email}
              onChange={handleState}
              value={state.email}
              name="email"
              label={t('Registration.email')}
            />
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.password}
              onChange={handleState}
              value={state.password}
              name="password"
              label={t('Registration.password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={classes.inputText}
            />
          </Grid>

          <Grid item xs={12} className={classes.wrapperContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleShowPassword}
                  name="showPassword"
                  color="primary"
                />
              }
              label={t('Registration.showPassword')}
            />
          </Grid>

          <Grid item xs={12} className={classes.wrapperContainer}>
            <Button onClick={singInByGoogle}>
              <span
                className={classes.imageIcon}
                style={{
                  backgroundImage: `url(${googleLogo})`,
                }}
              />
            </Button>
          </Grid>

          <Grid item xs={12} className={classes.wrapperContainer}>
            <Button
              onClick={validationForm}
              variant="contained"
              color="primary"
              disableElevation
              className={classes.buttonSingIn}
            >
              {t('Registration.signUp')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
