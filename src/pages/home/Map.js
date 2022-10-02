import { useRef, useEffect, useState } from "react";
import { TileLayer, useMap, Marker, MapContainer as mp } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const MapContainer = styled(mp)({
  width: "100%",
  height: "100%",
});

function Map({ location }) {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      map.flyTo([location.lat, location.lon], 17);
    }
  }, [location]);

  return (
    <MapContainer center={[location.lat, location.lon]} zoom={2} ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[location.lat, location.lon]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      ></Marker>
    </MapContainer>
  );
}

export default Map;
