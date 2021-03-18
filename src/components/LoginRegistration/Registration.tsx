import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Fab,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import 'firebase/auth';
import { MIN_LENGTH_PASSWORD } from 'appConstants';
import googleLogo from 'assets/svg/google-logo.svg.png';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { database } from 'services';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from 'store/actions';
import { useHistory } from 'react-router-dom';
import signInByGoogle from './utils/signInByGoogle';
import { useStyles } from './styledRegistration';

type TRegistrationState = {
  email: string;
  name: string;
  password: string;
  avatar: string;
};

export const Registration = () => {
  const [t] = useTranslation();
  const [state, setState] = React.useState<TRegistrationState>({
    email: '',
    name: '',
    password: '',
    avatar: '',
  });
  const [image, setImage] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [stateValidationField, setStateValidationField] = React.useState({
    stateOfValidEmail: false,
    stateOfValidName: false,
    stateOfValidPassword: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked);
  };

  const createAccountByEmail = async (name: string, avatar: string = '') => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password);

    if (user) {
      const createdUser = await database.createUser(
        user.uid,
        name,
        'ru',
        avatar
      );
      if (createdUser.id) {
        dispatch(setUserInfo(createdUser));
        dispatch(setLoginStatus(true));
        history.push('/');
      }
    }
  };

  const validationForm = (): void => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = re.test(String(state.email).toLowerCase());

    const stateOfValidEmail = !isValidEmail;
    const stateOfValidName = !state.name;
    const stateOfValidPassword = state.password.length <= MIN_LENGTH_PASSWORD;

    setStateValidationField({
      ...stateValidationField,
      stateOfValidEmail,
      stateOfValidName,
      stateOfValidPassword,
    });

    if (!stateOfValidEmail && !stateOfValidName && !stateOfValidPassword) {
      createAccountByEmail(state.name, state.avatar).catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          setStateValidationField({
            ...stateValidationField,
            stateOfValidEmail: true,
          });
        } else {
          console.log('Error_code', e.code);
          console.log('Error', e);
        }
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    const filesArr = Array.prototype.slice.call(files);

    const storageRef = firebase
      .storage()
      .ref(`${'Images' + '/profilePicture/'}${filesArr[0].name}`);
    await storageRef.put(filesArr[0]);
    setImage(await storageRef.getDownloadURL());
    setState({ ...state, avatar: await storageRef.getDownloadURL() });
  };

  const signInByGoogleHandler = async () => {
    const userData = await signInByGoogle();
    if (userData) {
      dispatch(setUserInfo(userData));
      dispatch(setLoginStatus(true));
      history.push('/');
    }
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.wrapperEmail}>
        <Grid container className={classes.wrapperContainer}>
          <Grid item xs={12} className={classes.wrapperContainer}>
            <Avatar className={classes.logo}>
              <PlaylistAddCheckIcon />
            </Avatar>
          </Grid>

          <Grid item xs={12} className={classes.wrapperContainer}>
            <Typography variant="h5">{t('Registration.signUp')}</Typography>
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.stateOfValidName}
              onChange={handleState}
              value={state.name}
              name="name"
              label={t('Registration.name')}
              className={classes.inputText}
            />
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.stateOfValidEmail}
              onChange={handleState}
              value={state.email}
              name="email"
              label={t('Registration.email')}
            />
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <TextField
              error={stateValidationField.stateOfValidPassword}
              onChange={handleState}
              value={state.password}
              name="password"
              label={t('Registration.password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={classes.inputText}
            />
          </Grid>

          <Grid container xs={12} className={classes.wrapperContainer}>
            <Fab color="primary" aria-label="add">
              <Avatar
                alt="avatar"
                src={image as string}
                className={classes.avatar}
                style={{ width: '56px' }}
              />
            </Fab>
            <Button
              style={{ marginLeft: '10px' }}
              variant="contained"
              component="label"
            >
              {t('Registration.avatar')}
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
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
            <Button onClick={signInByGoogleHandler}>
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
              className={classes.buttonSignIn}
            >
              {t('Registration.signUp')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
