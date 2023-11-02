import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import React from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

export const MapView = ({ zoom = 6, center = [0.5, 37.667169], towns }) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {towns.map((town, index) => (
        <Marker
          key={index}
          position={[town.lat, town.lon]}
          icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Popup>
            <strong>Town: </strong> {town.Town}
            <br></br>
            <strong>Petrol: </strong>
            {town.Super}/=<br></br>
            <strong>Kerosene: </strong>
            {town.Kerosene}/=<br></br>
            <strong>Diesel: </strong>
            {town.Diesel}/=<br></br>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
