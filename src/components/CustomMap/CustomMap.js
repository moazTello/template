import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { Marker } from 'react-map-gl';
import Map from 'react-map-gl';

import config from 'config';

const MAPBOX_TOKEN = config.mapToken;

const CustomMap = ({ coordinates, setMarks }) => {
  const mapStyles = useColorModeValue(
    'mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0',
    'mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5',
  );
  return (
    <>
      {(coordinates.length || setMarks) && (
        <Map
          initialViewState={{
            latitude: coordinates?.length
              ? coordinates[0]?.latitude
              : coordinates?.latitude
                ? coordinates?.latitude
                : 31.947811,
            longitude: coordinates?.length
              ? coordinates[0]?.longitude
              : coordinates?.longitude
                ? coordinates?.longitude
                : 35.924735,
            zoom: 13,
          }}
          cursor="pointer"
          onClick={(e) => {
            setMarks && setMarks(e);
          }}
          style={{ borderRadius: '20px', width: '100%', minHeight: '400px' }}
          mapStyle={mapStyles}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {coordinates !== '' && !coordinates.length && (
            <Marker latitude={coordinates?.latitude} longitude={coordinates?.longitude} />
          )}
          {coordinates !== '' &&
            coordinates.length &&
            coordinates?.map((item, index) => (
              <Marker key={index} latitude={item?.latitude} longitude={item?.longitude} />
            ))}
        </Map>
      )}
    </>
  );
};

export default CustomMap;
