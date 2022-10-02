import React, { useState, useEffect } from "react";
import Map from "./Map";
import io from "socket.io-client";

const socket = io.connect("http://api.retrieverruck.us:3000");

export const Home = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

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

    return () => {
      socket.off("location");
    };
  }, []);

  return <Map location={location} />;
};
