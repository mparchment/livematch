import { Button, Card as CardMui, Typography } from "@mui/material";
import styled from "styled-components";
import bgImg from "../../assets/img/flag_background.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

const ButtonContainer = styled(`div`)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  flexDirection: "column",
  gap: 5,
  marginTop: 50,
});

function Landing({ appid }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (appid !== "") return navigate("/home");
  }, []);

  return (
    <Container>
      <Card color="secondary">
        <Typography variant="p" fontWeight={"bold"}>
          LET'S START A
        </Typography>
        <Typography variant="h3">RUCKUS!</Typography>
        <ButtonContainer>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            <Typography variant="button" fontSize={14}>
              Log In
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
          >
            <Typography variant="button" fontSize={14}>
              Sign Up
            </Typography>
          </Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
}

export default Landing;
