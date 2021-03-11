import React, { FC, useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { LanguagesType, SliderDataType } from 'types';
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
    centerMode: true,
    variableWidth: true,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 501,
        settings: {
          centerMode: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
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

  const slides = sliderData
    ? sliderData.map((slide) => (
        <div className={classes.slickImage} key={slide.photo}>
          <img
            src={slide.photo}
            alt={slide.name[lang as keyof LanguagesType]}
          />
          <div className={classes.slickImageCaption}>
            <p className={classes.slickImageTitle}>
              {slide.name[lang as keyof LanguagesType]}
            </p>
            <p className={classes.slickImageDescription}>
              {slide.description[lang as keyof LanguagesType]}
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
