import React, { useState, useEffect } from "react";
import Map from "./Map";
import io from "socket.io-client";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Button, Spin, Collapse, Drawer, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography as TypographyMui } from "@mui/material";

const { Text } = Typography;

const socket = io.connect("https://socketio.retrieverruck.us");

const Container = styled("div")({
  width: "100%",
  height: "100%",
});

const FormContainer = styled(`div`)({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  gap: 10,
  marginTop: 50,
  marginBottom: 30,
});

const LogoutButton = styled(Button)({
  position: "fixed",
  top: 10,
  right: 10,
  zIndex: 10000,
  fontFamily: "Montserrat",
  fontSize: 14,
  fontWeight: 600,
  borderRadius: 7,
  opacity: 0.7,
  ":hover": {
    opacity: 1,
  },
});

const EventDescContainer = styled(`div`)({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  gap: 10,
  marginTop: 50,
  marginBottom: 30,
  width: "100%",
});

export const Home = ({ appid, setAppid }) => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });
  const DEFAULT_FORM = {
    owner: "",
    max_players: "",
    date_time: new Date(),
    duration: 0,
    description: "",
    title: "",
    location: "",
  };
  const [fields, setFields] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        socket.emit("location", {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
    );

    socket.on("fields", (fields) => {
      setFields(fields);
    });

    return () => {
      socket.off("fields");
    };
  }, [appid]);

  const getSelectedEvents = (location_id) => {
    setForm((prev) => ({ ...prev, location: location_id }));
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://api.retrieverruck.us/events/location?location_id=${location_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedEvents(data.message !== undefined ? [] : data);
      })
      .catch((err) => console.log(err));
  };

  if (location.lat === 0 && location.lon === 0) {
    return (
      <FormContainer>
        <Spin />
      </FormContainer>
    );
  }

  return (
    <Container>
      <TypographyMui
        variant="h5"
        fontFamily={"Montserrat"}
        fontWeight="800"
        style={{
          textShadow: `2px 2px #fdb515`,
          position: "fixed",
          top: 10,
          left: 20,
          zIndex: 1000,
        }}
      >
        RUCK.US!
      </TypographyMui>
      <Map
        location={location}
        fields={fields}
        setOpen={setOpen}
        setSelectedEvents={getSelectedEvents}
      />
      <LogoutButton
        danger
        type="primary"
        onClick={() => {
          localStorage.removeItem("appid");
          setAppid("");
          return navigate("/");
        }}
      >
        Log out
      </LogoutButton>
      {selectedEvents && (
        <>
          <Drawer
            title={selectedEvents.title}
            placement={"bottom"}
            closable={false}
            onClose={() => setOpen(false)}
            open={open}
            key={"bottom"}
          >
            <Collapse>
              {selectedEvents.map((event, index) => (
                <Collapse.Panel
                  key={index}
                  header={<Text>{event.title}</Text>}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <EventDescContainer>
                    <TypographyMui>{event.description}</TypographyMui>
                    <TypographyMui>
                      {new Date(event.date_time).toISOString()}
                    </TypographyMui>
                    <TypographyMui>{event.date_time}</TypographyMui>
                    <TypographyMui>
                      {parseInt(event.duration * 60)} min
                    </TypographyMui>
                    <TypographyMui>
                      Attendees: {event.attendees.length}
                    </TypographyMui>
                  </EventDescContainer>
                  {!event.attendees.includes(appid) ? (
                    <Button
                      style={{
                        marginLeft: "auto",
                      }}
                      onClick={() => {
                        const requestOptions = {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            event_id: event._id,
                            user_id: appid,
                          }),
                        };
                        //api.retrieverruck.us
                        fetch(
                          `https://api.retrieverruck.us/events/join`,
                          requestOptions
                        );
                      }}
                    >
                      <Typography fontSize={14}>Join</Typography>
                    </Button>
                  ) : event.owner === appid ? (
                    <Button
                      style={{
                        marginLeft: "auto",
                      }}
                      danger
                      onClick={() => {
                        const requestOptions = {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            event_id: event._id,
                            user_id: event.owner,
                          }),
                        };
                        //api.retrieverruck.us
                        fetch(
                          `https://api.retrieverruck.us/events/delete`,
                          requestOptions
                        );
                      }}
                    >
                      <Typography fontSize={14}>Delete</Typography>
                    </Button>
                  ) : (
                    <Button
                      style={{
                        marginLeft: "auto",
                      }}
                      onClick={() => {
                        const requestOptions = {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            event_id: event._id,
                            user_id: appid,
                          }),
                        };
                        //api.retrieverruck.us
                        fetch(
                          `https://api.retrieverruck.us/events/leave`,
                          requestOptions
                        );
                      }}
                    >
                      <Typography fontSize={14}>Leave</Typography>
                    </Button>
                  )}
                </Collapse.Panel>
              ))}
            </Collapse>
          </Drawer>
        </>
      )}
    </Container>
  );
};
