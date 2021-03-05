import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type PhotoGalleryProps = {
  pictures: string[];
};

export const PhotoGallery: FC<PhotoGalleryProps> = ({ pictures }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = pictures.map((pictureURL) => (
    <div key={pictureURL}>
      <img src={pictureURL} alt="country pic" />
    </div>
  ));

  return <Slider {...settings}>{slides}</Slider>;
};
