import React, { useState } from 'react';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const GeocoderControl = ({ mapboxAccessToken, position, marker = true, ...props }) => {
  const [mapMarker, setMapMarker] = useState(null);

  const geocoder = useControl(() => {
    const ctrl = new MapboxGeocoder({
      ...props,
      accessToken: mapboxAccessToken,
      marker: false,
    });

    ctrl.on('result', evt => {
      const { result } = evt;
      const location =
        result &&
        (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
      if (location && marker) {
        setMapMarker(<Marker longitude={location[0]} latitude={location[1]} />);
      } else {
        setMapMarker(null);
      }
    });

    return ctrl;
  }, { position });

};

export default GeocoderControl;
