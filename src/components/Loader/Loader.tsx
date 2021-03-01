import React, { FC } from 'react';
import './Loader.scss';

export const Loader: FC = () => (
  <div className="loader">
    <div className="cssload-loader">
      <div className="cssload-inner cssload-one" />
      <div className="cssload-inner cssload-two" />
      <div className="cssload-inner cssload-three" />
    </div>
  </div>
);
