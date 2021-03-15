import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { YMaps, Map as YMap, YMapsApi, MapOptions } from 'react-yandex-maps';
import { GeoPointType, YandexMapsPanoramaManager } from 'types';
import {
  MAPBOX_SEARCH_URL,
  MAPBOX_TILES_URL,
  YANDEX_MAPS_API_KEY,
} from 'appConstants/api';
import { ErrorMessage, Loader } from 'components';
import { useStyles } from './styled';

type MapProps = {
  geo: {
    type: string;
    coordinates: [[GeoPointType[]]];
  };
  capital?: string;
};

export const Map: FC<MapProps> = ({ geo, capital }) => {
  const classes = useStyles();
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null);
  const [mapElement, setMapElement] = useState<YMapsApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    if (!ymaps || !mapElement) {
      return;
    }
    const layer = new ymaps!.Layer('', {
      projection: ymaps!.projection.wgs84Mercator,
    });
    layer.getTileUrl = (tileNumber: number[], zoom: number) => {
      const actualZoom = Math.max(zoom - 1, 0);
      return MAPBOX_TILES_URL.replace('%z', actualZoom.toString())
        .replace('%x', Math.max(tileNumber[0], 0).toString())
        .replace('%y', Math.max(tileNumber[1], 0).toString());
    };
    layer.getTileSize = () => [512, 512];
    mapElement!.layers.add(layer);
  }, [ymaps, mapElement]);

  useLayoutEffect(() => {
    if (!ymaps || !mapElement || !geo) {
      return;
    }
    const objectManager = new ymaps!.ObjectManager();
    objectManager.add(
      geo.coordinates.map((polygon, id) => ({
        id,
        geometry: {
          type: 'Polygon',
          coordinates: polygon,
        },
        type: 'Feature',
        options: {
          cursor: 'default',
          fillColor: '#3f51b5',
          fillOpacity: 0.5,
          strokeColor: '#3f51b5',
          strokeOpacity: 0.5,
          strokeWidth: 5,
        },
      }))
    );
    mapElement!.geoObjects.add(objectManager);
    mapElement!.setBounds(mapElement!.geoObjects.getBounds(), {
      checkZoomRange: true,
    });
  }, [geo, ymaps, mapElement]);

  useLayoutEffect(() => {
    const controller = new AbortController();

    if (!ymaps || !mapElement || !capital) {
      return () => {
        controller.abort();
      };
    }
    const { signal } = controller;
    fetch(MAPBOX_SEARCH_URL.replace('%r', capital), { signal })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('response error');
        }
        return resp.json();
      })
      .then(({ features: [{ center, text }] }) => {
        setIsLoading(false);
        if (!mapElement || !ymaps) {
          return;
        }
        mapElement.geoObjects.add(
          new ymaps.Placemark(
            center,
            { iconCaption: text },
            {
              preset: 'islands#dotIcon',
              iconColor: '#3f51b5',
              cursor: 'default',
            }
          )
        );
      })
      .catch(onError);

    return () => {
      controller.abort();
    };
  }, [ymaps, mapElement, capital]);

  useLayoutEffect(() => {
    if (!mapElement) {
      return () => {};
    }
    let manager: YandexMapsPanoramaManager | null = null;
    mapElement
      .getPanoramaManager()
      .then((panoramaManager: YandexMapsPanoramaManager) => {
        manager = panoramaManager;
        manager.enableLookup();
      })
      .catch(onError);
    return () => {
      manager?.disableLookup();
    };
  }, [mapElement]);

  useEffect(
    () => () => {
      setMapElement(null);
      setYmaps(null);
    },
    []
  );

  const mapBoundaries = [
    [-179, -85],
    [179, 85],
  ];

  const modules = [
    'Layer',
    'projection.wgs84Mercator',
    'borders',
    'ObjectManager',
    'geocode',
    'control.ZoomControl',
    'control.FullscreenControl',
    'Placemark',
    'GeoObject',
    'geoObject.addon.balloon',
  ].join(',');

  const isNotLoaded = isError || isLoading;

  return (
    <div className={classes.mapWrapper}>
      {isNotLoaded && (
        <div className={classes.overlay}>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
        </div>
      )}
      <YMaps
        query={{
          apikey: YANDEX_MAPS_API_KEY,
          load: modules,
          lang: 'en_US',
          coordorder: 'longlat',
        }}
      >
        <YMap
          defaultState={{
            center: [0, 0],
            zoom: 9,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          instanceRef={setMapElement}
          onLoad={(api) => {
            setYmaps(api);
            setIsLoading(false);
            setIsError(false);
          }}
          options={{ restrictMapArea: mapBoundaries as unknown } as MapOptions}
          onError={onError}
        />
      </YMaps>
    </div>
  );
};
