import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import classes from '../PhotoGallery.module.scss';

type PrevArrowProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => (
  <button
    type="button"
    className={`${classes.slickArrow} ${classes.slickPrevArrow}`}
    onClick={onClick}
  >
    <ArrowBackIosIcon fontSize="large" />
  </button>
);
