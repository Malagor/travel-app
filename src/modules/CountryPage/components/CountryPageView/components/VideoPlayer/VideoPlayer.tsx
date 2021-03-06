import React, { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { ErrorMessage, Loader } from 'components';
import { useStyles } from './styled';

type VideoPlayerProps = {
  url: string;
};

export const VideoPlayer: FC<VideoPlayerProps> = ({ url }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [actualUrl, setActualUrl] = useState(url);
  const [loadTimeout, setLoadTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();

  const handleReady = () => {
    setActualUrl(url);
    setLoadTimeout(
      setTimeout(() => {
        setIsError(false);
        setIsLoading(false);
      }, 200)
    );
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useEffect(
    () => () => {
      if (loadTimeout) {
        window.clearTimeout(loadTimeout);
      }
    },
    [loadTimeout]
  );

  const isNotLoaded = isLoading || isError;

  return (
    <div className={classes.playerWrapper}>
      {isNotLoaded && (
        <div className={classes.overlay}>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
        </div>
      )}
      (
      <ReactPlayer
        id="player"
        width="100%"
        height="100%"
        url={actualUrl || url}
        controls={true}
        onReady={handleReady}
        onError={handleError}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      )
    </div>
  );
};
