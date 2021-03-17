import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import {
  YMaps,
  Map as YMap,
  YMapsApi,
  MapOptions,
  Placemark,
  Polygon,
  ObjectManagerFeature,
} from 'react-yandex-maps';
import { GeoPointType, YMapsPanoramaManager } from 'types';
import { MAPBOX_TILES_URL, YANDEX_MAPS_API_KEY } from 'appConstants/api';
import { ErrorMessage, Loader } from 'components';
import { useStyles } from './styled';

type MapProps = {
  geo: {
    type: string;
    coordinates: [[GeoPointType[]]];
    properties: {
      capital: GeoPointType;
    };
  };
  capital?: string;
};

export const Map: FC<MapProps> = ({ geo, capital }) => {
  const classes = useStyles();
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null);
  const [mapElement, setMapElement] = useState<YMapsApi | null>(null);
  const [manager, setManager] = useState<YMapsPanoramaManager | null>(null);
  const [isLayer, setIsLayer] = useState(false);
  const [
    countryPolygon,
    setCountryPolygon,
  ] = useState<ObjectManagerFeature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const capitalCoords = geo?.properties?.capital;

  const onApiLoad = (api: YMapsApi) => {
    setYmaps(api);
    setIsLoading(false);
    setIsError(false);
  };

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    if (mapElement) {
      mapElement
        .getPanoramaManager()
        .then((panoramaManager: YMapsPanoramaManager) => {
          setManager(panoramaManager);
          panoramaManager.enableLookup();
        })
        .catch(onError);
    }
    return () => {
      manager?.disableLookup();
    };
  }, [mapElement, manager]);

  useEffect(() => {
    if (mapElement && countryPolygon) {
      mapElement.setBounds(countryPolygon.geometry.getBounds(), {
        checkZoomRange: true,
      });
    }
  }, [mapElement, countryPolygon, capital]);

  useEffect(() => {
    if (ymaps && mapElement) {
      if (isLayer) {
        mapElement.setType('mapbox');
        return;
      }
      const layerCreator = function MapboxLayer() {
        const layerElement = new ymaps.Layer('', {
          projection: ymaps.projection.sphericalMercator,
        });
        layerElement.getTileUrl = (tileNumber: number[], zoom: number) => {
          const actualZoom = Math.max(zoom - 1, 0);
          return MAPBOX_TILES_URL.replace('%z', actualZoom.toString())
            .replace('%x', Math.max(tileNumber[0], 0).toString())
            .replace('%y', Math.max(tileNumber[1], 0).toString());
        };
        layerElement.getTileSize = () => [512, 512];
        return layerElement;
      };
      ymaps.layer.storage.add('mapbox', layerCreator);
      ymaps.mapType.storage.add(
        'mapbox',
        new ymaps.MapType('mapbox', ['mapbox'])
      );
      mapElement.setType('mapbox');
      setIsLayer(true);
    }
  }, [ymaps, mapElement, isLayer]);

  const mapBoundaries = [
    [-179, -85],
    [179, 85],
  ];

  const modules = [
    'Layer',
    'projection.sphericalMercator',
    'control.ZoomControl',
    'control.FullscreenControl',
    'Placemark',
    'geoObject.addon.balloon',
    'layer.storage',
    'mapType.storage',
    'MapType',
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
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          defaultState={{
            zoom: 9,
            center: [0, 0],
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          instanceRef={setMapElement}
          onLoad={onApiLoad}
          options={
            {
              restrictMapArea: mapBoundaries as unknown,
              autoFitToViewport: 'always',
            } as MapOptions
          }
          onError={onError}
        >
          {geo?.coordinates &&
            geo.coordinates.map((polygon) => (
              <Polygon
                key={JSON.stringify(polygon)}
                geometry={polygon}
                options={{
                  geodesic: true,
                  cursor: 'default',
                  fillColor: '#3f51b5',
                  fillOpacity: 0.1,
                  strokeColor: '#3f51b5',
                  strokeOpacity: 0.5,
                  strokeWidth: 5,
                }}
                instanceRef={setCountryPolygon}
              />
            ))}
          {capital && capitalCoords && (
            <Placemark
              geometry={capitalCoords}
              properties={{ iconCaption: capital }}
              options={{
                preset: 'islands#dotIcon',
                iconColor: '#3f51b5',
                cursor: 'default',
              }}
            />
          )}
        </YMap>
      </YMaps>
    </div>
  );
};
