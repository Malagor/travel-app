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

import {
  CountryType,
  LanguagesType,
  SliderDataType,
  State,
  UserInfo,
} from 'types';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { database } from 'services';
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

  const userId = useSelector((state: State) => state.userInfo.id);
  const countryId = useSelector((state: State) => state.country.id);

  const setRating = (attrId: string, rating: number) => {
    database
      .setRating(countryId, attrId, userId, rating)
      .then((data: [UserInfo, CountryType]) => {
        // в ответе получаем данные пользователя и данные текущей страны.
        // Возможно это излишняя инфа и я попробую ее сократить до минимальной информации.
        // в любом случае, там можно увидеть измененные рейтинги у пльзователя и у страны
        // мы можем показывать пользователю не только общую ойценку, но и как он оценил
        // в стране храниться сумма и количество голосовавших. Среднее нужно вычислять
        // У пользователя храниться его оценка просто.
        // Подробней насчет типов описано в типах

        const [user, country] = data;
        console.log(
          'User rating',
          user.attractionRates.find((value) => value.attrId === attrId)
        );
        console.log('country', country);
      });
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
        <div className={classes.slickImage} key={slide.id}>
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
            <p style={{ fontSize: '20px', color: 'red' }}>
              Рейтинг сумма: {slide.rating.sum}, количество,{' '}
              {slide.rating.count}
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setRating(slide.id, 5)}
            >
              Рейтинг 5
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setRating(slide.id, 1)}
            >
              Рейтинг 1
            </Button>
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
