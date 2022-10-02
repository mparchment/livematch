import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/auth/Landing";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { Home } from "./pages/home/home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#D9D9D9",
    },
  },
});
export const Main = () => {
  const [data, useData] = useState({});
  const [appid, setAppid] = useState(() => localStorage.getItem("appid") ?? "");

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path="/map" element={<App />} /> */}
        <Route
          path="/login"
          element={<Login appid={appid} setAppid={setAppid} />}
        />
        <Route
          path="/signup"
          element={<Signup appid={appid} setAppid={setAppid} />}
        />
        <Route path="/" element={<Landing appid={appid} />} />
        <Route
          path="/home"
          element={<Home appid={appid} setAppid={setAppid} />}
        />
      </Routes>
    </ThemeProvider>
  );
};
