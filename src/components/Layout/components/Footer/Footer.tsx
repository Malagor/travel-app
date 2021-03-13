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
  wrapperAuthor: {
    textAlign: 'center',
  },
  imageSchool: {
    width: '55px',
    height: '20px ',
    backgroundRepeat: 'no-repeat',
  },
  logoSchool: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gtiLogoImg: {
    width: '15px',
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
      >
        <Grid item xs={3}>
          <ButtonBase focusRipple href="https://github.com/Malagor/travel-app">
            <Typography variant="h6">Go-Go Travel</Typography>
          </ButtonBase>
        </Grid>

        <Grid item xs={6} className={classes.wrapperAuthor}>
          <Grid container spacing={1}>
            {authors.map((author) => (
              <Grid
                item
                sm={12}
                md={6}
                lg={3}
                key={author.name}
                justify="center"
              >
                <ButtonBase focusRipple href={author.gitHub}>
                  <span>
                    <Typography
                      component="span"
                      variant="subtitle1"
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

        <Grid item xs={3} className={classes.logoSchool}>
          <Grid container sm={12} md={10} lg={6} spacing={1}>
            <Grid item sm={12} md={6} justify="center">
              <ButtonBase focusRipple href="https://rs.school/js/">
                <span
                  className={classes.imageSchool}
                  style={{
                    backgroundImage: `url('https://rs.school/images/rs_school_js.svg')`,
                  }}
                />
              </ButtonBase>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography>© 2021</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};
