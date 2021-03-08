import React, { FC, useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styled from 'styled-components';
import { WHITE_COLOR } from 'appConstants/colors';
import { LanguagesType, StateCountry } from 'types';

import classes from './PhotoGallery.module.scss';

type PhotoGalleryProps = {
  country: StateCountry;
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

const GalleryFullScreenButton = styled(IconButton)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

function SampleNextArrow({
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

function SamplePrevArrow({
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

export const PhotoGallery: FC<PhotoGalleryProps> = ({ country, lang }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const settings = {
    customPaging(i: number) {
      return (
        <a className={classes.slickThumbsLink}>
          <img
            src={country.attractions ? country.attractions[i].photo : ''}
            alt={
              country.attractions
                ? country.attractions[i].name[lang as keyof LanguagesType]
                : ''
            }
          />
        </a>
      );
    },
    dots: true,
    dotsClass: classes.slickThumbs,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    className: fullScreen ? classes.sliderFullScreen : classes.slickSlider,
    centerMode: true,
    variableWidth: true,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
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
      if (document.fullscreenElement === sliderRef.current) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    };
    return () => {
      document.onfullscreenchange = null;
    };
  }, []);

  const slides = country.attractions
    ? country.attractions.map((attraction) => (
        <div className={classes.slickImage} key={attraction.photo}>
          <img
            src={attraction.photo}
            alt={attraction.name[lang as keyof LanguagesType]}
          />
          <div className={classes.slickImageCaption}>
            <p className={classes.slickImageTitle}>
              {attraction.name[lang as keyof LanguagesType]}
            </p>
            <p className={classes.slickImageDescription}>
              {attraction.description[lang as keyof LanguagesType]}
            </p>
          </div>
        </div>
      ))
    : null;

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <SliderContainer
      ref={sliderRef}
      className={
        fullScreen ? classes.sliderContainerFullScreen : classes.sliderContainer
      }
    >
      <GalleryFullScreenButton size="medium" onClick={handleFullScreen}>
        {fullScreen ? (
          <FullscreenExitIcon htmlColor={WHITE_COLOR} />
        ) : (
          <FullscreenIcon htmlColor={WHITE_COLOR} />
        )}
      </GalleryFullScreenButton>
      <Slider {...settings}>{slides}</Slider>
    </SliderContainer>
  );
};
