import { Button, TextField, Card as CardMui, Typography } from "@mui/material";
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
  gap: 20,
  marginTop: 50,
  marginBottom: 30,
});

export const Signup = ({ appid, setAppid }) => {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (appid !== "") return navigate("/home");
  }, []);
  const signup = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
        username: username,
        lastname: lastname,
      }),
    };
    fetch(`https://api.retrieverruck.us/users/signup`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("appid", data.data.appid);
        console.log(data.data);
        setAppid(data.data.appid);
        return navigate("/home");
      });
  };

  return (
    <Container>
      <Card color="secondary">
        <Typography variant="h2" onClick={() => navigate("/")}>RUCKUS!</Typography>
        <Typography variant="p" fontWeight={"bold"}>
          Sign Up
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
            id="firstname"
            label="First Name"
            variant="outlined"
            size="small"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
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
        <Button variant="contained" size="large" onClick={() => signup()}>
          <Typography variant="button" fontSize={14}>
            Sign Up
          </Typography>
        </Button>
      </Card>
    </Container>
  );
};
