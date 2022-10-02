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
  height: "fit-content",
  padding: 20,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "grey",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px !important",
  borderRadius: "15px !important",
});

const FormContainer = styled(`div`)({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  gap: 10,
  marginTop: 50,
  marginBottom: 30,
  width: "100%",
});

export const Login = ({ appid, setAppid }) => {
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (appid !== "") return navigate("/home");
  }, []);

  const login = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://api.retrieverruck.us/users/login?lastname=${lastname}&username=${username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("appid", data.data.appid);
        setAppid(data.data.appid);
        return navigate("/home");
      });
  };

  return (
    <Container>
      <Card color="secondary">
        <div>
          <Typography
            variant="p"
            fontFamily={"Montserrat"}
            fontSize={12}
            fontWeight="700"
          >
            LOGIN to continue
          </Typography>
          <Typography
            variant="h3"
            fontFamily={"Montserrat"}
            fontWeight="bold"
            onClick={() => navigate("/")}
            style={{
              textShadow: `2px 2px #fdb515`,
            }}
          >
            RUCK.US!
          </Typography>
        </div>
        <FormContainer>
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            size="small"
            value={lastname}
            fontFamily={"Montserrat"}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            fontFamily={"Montserrat"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormContainer>
        <Button
          fontFamily={"Montserrat"}
          variant="contained"
          onClick={() => login()}
          fullWidth
        >
          <Typography variant="button" fontSize={14} fontWeight="600">
            Log In
          </Typography>
        </Button>
      </Card>
    </Container>
  );
};
