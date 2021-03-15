import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { YMaps, Map as YMap, YMapsApi, MapOptions } from 'react-yandex-maps';
import {
  GeoPointType,
  YandexMapsGeocodeResponse,
  YandexMapsPanoramaManager,
} from 'types';
import { YANDEX_MAPS_API_KEY, MAPBOX_TILES_STRING } from 'appConstants/api';
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
  const [manager, setManager] = useState<YandexMapsPanoramaManager | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const addMapboxLayer = useCallback(() => {
    const layer = new ymaps!.Layer('', {
      projection: ymaps!.projection.wgs84Mercator,
    });
    layer.getTileUrl = (tileNumber: number[], zoom: number) => {
      const actualZoom = Math.max(zoom - 1, 0);
      return MAPBOX_TILES_STRING.replace('%z', actualZoom.toString())
        .replace('%x', Math.max(tileNumber[0], 0).toString())
        .replace('%y', Math.max(tileNumber[1], 0).toString());
    };
    layer.getTileSize = () => [512, 512];
    mapElement!.layers.add(layer);
  }, [ymaps, mapElement]);

  const addPanorama = useCallback(() => {
    mapElement!
      .getPanoramaManager()
      .then((panoramaManager: YandexMapsPanoramaManager) => {
        setManager(panoramaManager);
        panoramaManager.enableLookup();
      })
      .catch();
  }, [mapElement]);

  const addPlacemark = useCallback(() => {
    if (!capital) {
      return;
    }
    ymaps!
      .geocode(capital, {
        results: 1,
      })
      .then((res: YandexMapsGeocodeResponse) => {
        if (ymaps && mapElement) {
          const city = res.geoObjects.get(0);
          if (city) {
            city.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            city.properties.set('iconCaption', city.getAddressLine());
            mapElement.geoObjects.add(city);
          }
        }
      })
      .catch();
  }, [ymaps, mapElement, capital]);

  const selectCountry = useCallback(() => {
    if (!geo) {
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
  }, [ymaps, mapElement, geo]);

  useLayoutEffect(() => {
    if (ymaps && mapElement) {
      addMapboxLayer();
      selectCountry();
      addPanorama();
      addPlacemark();
    }
    return () => {
      manager?.disableLookup();
      setMapElement(null);
      setYmaps(null);
    };
  }, [
    capital,
    geo,
    ymaps,
    mapElement,
    manager,
    addMapboxLayer,
    selectCountry,
    addPanorama,
    addPlacemark,
  ]);

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
    'GeoObject',
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
          style={{ width: '100%', height: '100%' }}
          instanceRef={setMapElement}
          onLoad={(api) => {
            setYmaps(api);
            setIsLoading(false);
            setIsError(false);
          }}
          options={{ restrictMapArea: mapBoundaries as unknown } as MapOptions}
          onError={() => {
            setIsError(true);
            setIsLoading(false);
          }}
        />
      </YMaps>
    </div>
  );
};
