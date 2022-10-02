import { Button, TextField, Card as CardMui, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import bgImg from "../../assets/img/flag_background.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled(`div`)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundImage: `url(${bgImg})`,
});

const Card = styled(CardMui)({
  width: "80%",
  maxWidth: 400,
  maxHeight: 500,
  minHeight: "40%",
  height: "fit-content",
  padding: 20,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "grey",
});

const FormContainer = styled(`div`)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  flexDirection: "column",
  gap: 5,
  marginTop: 50,
  marginBottom: 30,
});

export const Login = () => {
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  const login = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://api.retrieverruck.us:3000/users/login?lastname=${lastname}&username=${username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("appid", data.data.appid));
  };

  return (
    <Container>
      <Card color="secondary">
        <Typography variant="h3">RUCKUS!</Typography>
        <Typography variant="p" fontWeight={"bold"}>
          Log In
        </Typography>
        <FormContainer>
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            size="small"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormContainer>
        <Button variant="contained" size="large" onClick={() => login()}>
          <Typography variant="button" fontSize={14}>
            Log In
          </Typography>
        </Button>
      </Card>
    </Container>
  );
};
