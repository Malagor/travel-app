import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

import { LanguagesType, SliderDataType, State } from 'types';
import { database } from 'services';
import { loadCountry, loadUserInfo } from 'store/actions';
import classes from '../PhotoGallery.module.scss';

type SlideProps = {
  slideData: SliderDataType;
  lang: string;
};

export const Slide: React.FC<SlideProps> = ({ slideData, lang }) => {
  const userRates = useSelector(
    (state: State) => state.userInfo.attractionRates
  );
  const countryId = useSelector((state: State) => state.country.id);
  const userId = useSelector((state: State) => state.userInfo.id);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userRate = userRates.find((rate) => rate.attrId === slideData.id);

  const onRatingChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    value: number | null
  ) => {
    database
      .setRating(countryId, evt.target.name, userId, value as number)
      .then((res) => {
        dispatch(loadCountry(countryId));
        dispatch(loadUserInfo(userId));
      })
      .catch((err) => err);
  };

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
                  value={userRate ? userRate.rating : 0}
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
                  slideData.rating.count
                    ? (slideData.rating.sum / slideData.rating.count).toFixed(1)
                    : '0'
                }
                color="secondary"
              >
                <Chip label={t('Rating')} />
              </Badge>
              <Badge
                badgeContent={slideData.rating.count || '0'}
                color="primary"
              >
                <Chip label={t('Voted')} />
              </Badge>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
