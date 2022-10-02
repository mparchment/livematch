import { useRef, useEffect } from "react";
import { TileLayer, Marker, MapContainer as mp, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import pinIcon from "../../assets/img/pin.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Card } from "antd";
import { Button, Typography } from "@mui/material";

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
    <MapContainer
      center={[
        location.lat === 0 ? 39.0458 : location.lat,
        location.lon === 0 ? 76.6413 : location.lon,
      ]}
      zoom={10}
      ref={mapRef}
      zoomControl={false}
    >
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
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setOpen(true);
                    setSelectedEvents(field._id);
                  }}
                >
                  <Typography
                    variant="p"
                    fontFamily={"Montserrat"}
                    fontSize={10}
                    fontWeight="700"
                  >
                    View Events
                  </Typography>
                </Button>
              }
              fontFamily={"Montserrat"}
              style={{
                width: "70vw",
                maxWidth: 300,
                border: "none",
              }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="p"
                fontFamily={"Montserrat"}
                fontSize={12}
                fontWeight="500"
              >
                Latitude: {parseFloat(field.location.latitude).toFixed(4)}
              </Typography>
              <Typography
                variant="p"
                fontFamily={"Montserrat"}
                fontSize={12}
                fontWeight="500"
              >
                Longitude: {parseFloat(field.location.longitude).toFixed(4)}
              </Typography>
              <Typography
                variant="p"
                fontFamily={"Montserrat"}
                fontSize={12}
                fontWeight="500"
                marginTop={3}
              >
                Max Events: {field.max_events}
              </Typography>
              <Typography
                variant="p"
                fontFamily={"Montserrat"}
                fontSize={12}
                fontWeight="500"
              >
                Open Events: {field.events.filter((el) => el !== "").length}
              </Typography>
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
