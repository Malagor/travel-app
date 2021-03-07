import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  image: {
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}));
