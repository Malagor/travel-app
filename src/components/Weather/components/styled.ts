import makeStyles from '@material-ui/core/styles/makeStyles';
import { darken } from '@material-ui/core';
import { WEATHER_COLOR } from 'appConstants/colors';

export const useStyles = makeStyles((theme) => ({
  weather: {
    width: '100%',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    backgroundColor: WEATHER_COLOR,
  },
  title: {
    maxWidth: '130px',
    '& h3': {
      margin: 0,
    },
    '& span': {
      display: 'block',
      marginTop: '-3px',
      lineHeight: '1.2',
    },
  },
  icon: {
    marginLeft: '10px',
    maxWidth: '50px',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: '140%',
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
  },
  temperature: {
    marginLeft: '5px',
    fontSize: '50px',
    fontWeight: 700,
    color: darken(WEATHER_COLOR, 0.35),
  },
  info: {
    marginLeft: '15px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    '& span': {
      marginLeft: '10px',
      fontWeight: 500,
    },
  },
}));
