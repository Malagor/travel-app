import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage } from 'components';
import { TPointInfo } from 'types';
import classes from './PointInfoTest.module.scss';

type PointInfoTestProps = {
  xid: string;
  lang?: string;
};

export const PointInfoTest: FC<PointInfoTestProps> = ({ xid, lang = 'ru' }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pointInfo, setPointInfo] = useState<TPointInfo>({});

  const API_KEY = '5ae2e3f221c38a28845f05b6f094816c72db69dda349ba89724b17df';
  const url = `https://api.opentripmap.com/0.1/${lang}/places/xid/${xid}?apikey=${API_KEY}`;

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const getPlaceData = () =>
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error response Data');
        }
        return resp.json();
      })
      .then((data) => {
        setIsLoading(false);
        setPointInfo(data);
        return data;
      });

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPlaceData().catch(onError);
  }, [xid]);

  const pointView = () => {
    const { name, preview, wikipedia_extracts: wikipediaExtracts } = pointInfo;

    const source = preview?.source;
    const desc = wikipediaExtracts?.text;

    return (
      <div style={{ maxWidth: '300px', textAlign: 'center' }}>
        <h2>{name}</h2>
        {source && (
          <img src={source} alt="{name}" style={{ maxWidth: '100%' }} />
        )}
        <p>{desc}</p>
      </div>
    );
  };

  const hasData = !(isError || isLoading);

  return (
    <div className={classes.PointInfoTest}>
      {isLoading && 'loader'}
      {isError && <ErrorMessage />}
      {hasData && pointView()}
      {hasData ? pointView() : null }
    </div>
  );
};
