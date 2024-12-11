import * as React from 'react';
import Map from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoib21hcnNkZXYiLCJhIjoiY2x2bGNibzMxMHc5MDJsbWtndHgweGxqdSJ9.Eb_s96x7w0gvdhNqnju6Hg'; // Set your mapbox token her

export default function MapComponent() {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    ></Map>
  );
}
