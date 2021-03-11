import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import RSSchool from 'https://rs.school/images/rs_school_js.svg'

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
  authorLink: {
    margin: '8px'
  },
  wrapperAuthor: {
    textAlign: 'center'
  },
  imageSchool: {
    width: '55px',
    height: '20px ',
    backgroundRepeat: 'no-repeat'
  },
  logoSchool: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

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
                <Typography variant="h6" >
                  Go-Go Travel
                </Typography>
              </Grid>

              <Grid item xs={6} className={classes.wrapperAuthor}>
                {authors.map(author => (
                  <ButtonBase
                    focusRipple
                    key={author.name}
                    href={author.gitHub}
                    className={classes.authorLink}
                  >
                    <span >
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                      >
                        {author.name}
                      </Typography>
                    </span>
                  </ButtonBase>
                ))}
              </Grid>

              <Grid item xs={3} className={classes.logoSchool}>
                <Typography>
                  © 2021
                </Typography>
                <ButtonBase
                  focusRipple
                  href='https://rs.school/js/'
                >
                  <span
                    className={classes.imageSchool}
                    style={{
                      margin: '8px',
                      backgroundImage: `url('https://rs.school/images/rs_school_js.svg')`,
                    }}
                  />
                </ButtonBase>
              </Grid>
            </Grid>
    </footer>
  );
};