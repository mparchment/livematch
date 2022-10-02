import { useRef, useEffect } from "react";
import { TileLayer, Marker, MapContainer as mp, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import pinIcon from "../../assets/img/pin.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Card } from "antd";

const MapContainer = styled(mp)({
  width: "100%",
  height: "100%",
});

function Map({ location, fields, setOpen, setSelectedEvents }) {
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
      {fields.map((field, index) => (
        <Marker
          key={index}
          position={[field.location.latitude, field.location.longitude]}
          icon={
            new Icon({
              iconUrl: pinIcon,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <Card
              size="small"
              title={field.name}
              extra={
                <div
                  onClick={() => {
                    setOpen(true);
                    setSelectedEvents(field._id);
                  }}
                >
                  View Events
                </div>
              }
              style={{
                width: "70vw",
                maxWidth: 300,
                border: "none",
              }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Popup>
        </Marker>
      ))}
      <Marker
        position={[location.lat, location.lon]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [15, 24],
          })
        }
      ></Marker>
    </MapContainer>
  );
}

export default Map;
