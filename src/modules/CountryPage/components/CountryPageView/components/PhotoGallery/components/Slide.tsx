import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

import { LanguagesType, AttractionDataType, State } from 'types';
import { database } from 'services';
import classes from '../PhotoGallery.module.scss';

type SlideProps = {
  slideData: AttractionDataType;
  lang: string;
};

export const Slide: React.FC<SlideProps> = ({ slideData, lang }) => {
  const userRatesData = useSelector(
    (state: State) => state.userInfo.attractionRates
  );
  const countryId = useSelector((state: State) => state.country.id);
  const userId = useSelector((state: State) => state.userInfo.id);
  const { t } = useTranslation();

  const userRateData = userRatesData.find(
    (rate) => rate.attrId === slideData.id
  );
  const userRating = userRateData ? userRateData.rating : 0;

  const [currentUserRating, setCurrentUserRating] = useState(userRating);
  const [currentRatingSum, setCurrentRatingSum] = useState(
    slideData.rating.sum
  );
  const [currentRatingCount, setCurrentRatingCount] = useState(
    slideData.rating.count
  );

  useEffect(() => {
    setCurrentUserRating(userRateData ? userRateData.rating : 0);
    setCurrentRatingSum(slideData.rating.sum);
    setCurrentRatingCount(slideData.rating.count);
  }, [userRateData, slideData.rating.sum, slideData.rating.count]);

  const onRatingChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    value: number | null
  ) => {
    database
      .setRating(countryId, evt.target.name, userId, value as number)
      .then((res) => {
        setCurrentUserRating(res.userRating);
        setCurrentRatingSum(res.attrRating.sum);
        setCurrentRatingCount(res.attrRating.count);
      })
      .catch((err) => err);
  };

  const recentVoters = slideData.users.map((user) => (
    <TableRow key={user.name}>
      <TableCell scope="row">
        <Avatar src={user.avatar} />
      </TableCell>
      <TableCell scope="row">{user.name}</TableCell>
      <TableCell align="right">{user.rating}</TableCell>
    </TableRow>
  ));

  return (
    <Grid container className={classes.slickImage} key={slideData.id}>
      <Grid item md={12} lg={7}>
        <img
          src={slideData.photo}
          alt={slideData.name[lang as keyof LanguagesType]}
        />
      </Grid>
      <Grid item md={12} lg={5} className={classes.slickImageInfo}>
        <div className={classes.slickImageInfoWrapper}>
          <div className={classes.slickImageCaption}>
            <p className={classes.slickImageTitle}>
              {slideData.name[lang as keyof LanguagesType]}
            </p>
            <p className={classes.slickImageDescription}>
              {slideData.description[lang as keyof LanguagesType]}
            </p>
          </div>
          <div className={classes.slickAttractionRating}>
            {userId && (
              <div>
                <p className={classes.slickAttractionRatingHeader}>
                  {t('Rate This Place')}
                </p>
                <Rating
                  name={slideData.id}
                  value={currentUserRating}
                  precision={0.5}
                  max={5}
                  size="large"
                  className={classes.slickAttractionRatingStars}
                  onChange={(evt, value) =>
                    onRatingChange(
                      evt as React.ChangeEvent<HTMLInputElement>,
                      value
                    )
                  }
                />
              </div>
            )}
            <div className={classes.slickAttractionRatingStats}>
              <Badge
                badgeContent={
                  currentRatingCount
                    ? (currentRatingSum / currentRatingCount).toFixed(1)
                    : '0'
                }
                color="secondary"
              >
                <Chip label={t('Rating')} />
              </Badge>
              <Badge badgeContent={currentRatingCount || '0'} color="primary">
                <Chip label={t('Voted')} />
              </Badge>
              <TableContainer component={Paper}>
                <Table
                  size="small"
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        {t('Recent Votes')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{recentVoters}</TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
