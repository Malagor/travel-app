import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop: '56.25%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10,
    background: '#ffffff',
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));
