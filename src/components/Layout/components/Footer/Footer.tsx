import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import gitLogo from 'assets/webp/mark-github-512.webp';

const authors = [
  {
    name: 'Malagor',
    gitHub: 'https://github.com/Malagor',
  },
  {
    name: 'Femiarkh',
    gitHub: 'https://github.com/femiarkh',
  },
  {
    name: 'Liza-Veis',
    gitHub: 'https://github.com/Liza-Veis',
  },
  {
    name: 'Andrei107Q',
    gitHub: 'https://github.com/Andrei107Q',
  },
];

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  wrapperContent: {},
  nameApp: {
    [theme.breakpoints.down('sm')]: {
      order: '1',
    },
  },
  authorsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      order: '3',
      marginTop: theme.spacing(1),
    },
  },
  logoSchool: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      order: '2',
    },
  },
  imageSchool: {
    width: '55px',
    height: '20px ',
    backgroundRepeat: 'no-repeat',
  },
  gtiLogoImg: {
    width: '12px',
    margin: '3px',
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.wrapperContent}
      >
        <Grid item sm={6} md={2} className={classes.nameApp}>
          <ButtonBase focusRipple href="https://github.com/Malagor/travel-app">
            <Typography variant="h6">Go-Go Travel</Typography>
          </ButtonBase>
        </Grid>

        <Grid item md={8} xs={12} className={classes.authorsContent}>
          <Grid container justify="space-between">
            {authors.map((author) => (
              <Grid item md={3} key={author.name} justify="center">
                <ButtonBase focusRipple href={author.gitHub}>
                  <span>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="inherit"
                    >
                      {author.name}
                    </Typography>
                  </span>
                  <img
                    className={classes.gtiLogoImg}
                    src={gitLogo}
                    alt="git logo"
                  />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          item
          sm={6}
          md={2}
          justify="center"
          className={classes.logoSchool}
        >
          <ButtonBase focusRipple href="https://rs.school/js/">
            <span
              className={classes.imageSchool}
              style={{
                margin: '8px',
                backgroundImage: `url('https://rs.school/images/rs_school_js.svg')`,
              }}
            />
          </ButtonBase>
          <Typography>© 2021</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};
