import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import classes from '../PhotoGallery.module.scss';

type NextArrowProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const NextArrow: React.FC<NextArrowProps> = ({ onClick }) => (
  <button
    type="button"
    className={`${classes.slickArrow} ${classes.slickNextArrow}`}
    onClick={onClick}
  >
    <ArrowForwardIosIcon fontSize="large" />
  </button>
);
