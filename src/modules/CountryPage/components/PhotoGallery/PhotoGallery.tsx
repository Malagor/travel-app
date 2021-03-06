import React, { FC, useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import styled from 'styled-components';
import { WHITE_COLOR } from 'appConstants/colors';
import classes from './PhotoGallery.module.scss';

type PhotoGalleryProps = {
  pictures: string[];
};

const SliderContainer = styled('div')`
  position: relative;
`;

const GalleryFullScreenButton = styled(IconButton)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const PhotoGallery: FC<PhotoGalleryProps> = ({ pictures }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const settings = {
    customPaging(i: number) {
      return (
        <a className={classes.slickThumbsLink}>
          <img src={pictures[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: classes.slickThumbs,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    className: fullScreen ? classes.sliderFullScreen : '',
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

  const slides = pictures.map((pictureURL) => (
    <div key={pictureURL}>
      <img src={pictureURL} alt="country pic" />
    </div>
  ));

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <SliderContainer
      ref={sliderRef}
      className={fullScreen ? classes.sliderContainerFullScreen : ''}
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