import React, { FC, useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { database } from 'services';
import { loadCountry, loadUserInfo } from 'store/actions';

import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

import { LanguagesType, SliderDataType, State } from 'types';
import classes from './PhotoGallery.module.scss';

type PhotoGalleryProps = {
  sliderData: SliderDataType[];
  lang: string;
};

const SliderContainer = styled('div')`
  position: relative;

  .slick-track {
    display: flex;

    img {
      width: 100%;
    }
  }

  li.slick-active img {
    opacity: 0.5;
  }
`;

function NextArrow({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className={`${classes.slickArrow} ${classes.slickNextArrow}`}
      onClick={onClick}
    >
      <ArrowForwardIosIcon fontSize="large" />
    </button>
  );
}

function PrevArrow({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className={`${classes.slickArrow} ${classes.slickPrevArrow}`}
      onClick={onClick}
    >
      <ArrowBackIosIcon fontSize="large" />
    </button>
  );
}

export const PhotoGallery: FC<PhotoGalleryProps> = ({ sliderData, lang }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { t } = useTranslation();
  const countryId = useSelector((state: State) => state.country.id);
  const userId = useSelector((state: State) => state.userInfo.id);
  const userRates = useSelector(
    (state: State) => state.userInfo.attractionRates
  );
  const dispatch = useDispatch();

  const settings = {
    customPaging(i: number) {
      return (
        <button
          style={{ border: 'none', padding: 0, outline: 'none' }}
          type="button"
          className={classes.slickThumbsLink}
        >
          <img
            src={sliderData ? sliderData[i].photo : ''}
            alt={
              sliderData ? sliderData[i].name[lang as keyof LanguagesType] : ''
            }
          />
        </button>
      );
    },
    dots: true,
    dotsClass: classes.slickThumbs,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    className: fullScreen ? classes.slickFullScreen : classes.slickSlider,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
  };

  const handleFullScreen = () => {
    if (sliderRef.current && document.fullscreenElement === null) {
      sliderRef.current.requestFullscreen();
    } else if (
      sliderRef.current &&
      document.fullscreenElement === sliderRef.current
    ) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.onfullscreenchange = () => {
      setFullScreen(document.fullscreenElement === sliderRef.current);
    };
    return () => {
      document.onfullscreenchange = null;
    };
  }, []);

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

  const slides = sliderData
    ? sliderData.map((slide) => {
        const userRate = userRates.find((rate) => rate.attrId === slide.id);
        return (
          <Grid container className={classes.slickImage} key={slide.id}>
            <Grid item md={12} lg={7}>
              <img
                src={slide.photo}
                alt={slide.name[lang as keyof LanguagesType]}
              />
            </Grid>
            <Grid item md={12} lg={5} className={classes.slickImageInfo}>
              <div className={classes.slickImageInfoWrapper}>
                <div className={classes.slickImageCaption}>
                  <p className={classes.slickImageTitle}>
                    {slide.name[lang as keyof LanguagesType]}
                  </p>
                  <p className={classes.slickImageDescription}>
                    {slide.description[lang as keyof LanguagesType]}
                  </p>
                </div>
                <div className={classes.slickAttractionRating}>
                  {userId && (
                    <div>
                      <p className={classes.slickAttractionRatingHeader}>
                        {t('Rate This Place')}
                      </p>
                      <Rating
                        name={slide.id}
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
                        slide.rating.count
                          ? slide.rating.sum / slide.rating.count
                          : '0'
                      }
                      color="secondary"
                    >
                      <Chip label={t('Rating')} />
                    </Badge>
                    <Badge
                      badgeContent={slide.rating.count || '0'}
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
      })
    : null;

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <SliderContainer
      ref={sliderRef}
      className={
        fullScreen ? classes.slickContainerFullScreen : classes.slickContainer
      }
    >
      <IconButton
        size="medium"
        onClick={handleFullScreen}
        className={classes.slickFullScreenButton}
      >
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <Slider {...settings}>{slides}</Slider>
    </SliderContainer>
  );
};
