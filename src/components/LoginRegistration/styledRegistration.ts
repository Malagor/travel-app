import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
