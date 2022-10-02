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

const ButtonContainer = styled(`div`)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
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
        <div>
          <Typography
            variant="p"
            fontFamily={"Montserrat"}
            fontSize={12}
            fontWeight="700"
          >
            LET'S START A
          </Typography>
          <Typography
            variant="h3"
            fontFamily={"Montserrat"}
            fontWeight="bold"
            style={{
              textShadow: `2px 2px #fdb515`,
            }}
          >
            RUCK.US!
          </Typography>
        </div>
        <ButtonContainer>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            <Typography
              fontFamily={"Montserrat"}
              variant="button"
              fontSize={12}
            >
              Log In
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
          >
            <Typography
              fontFamily={"Montserrat"}
              variant="button"
              fontSize={12}
            >
              Sign Up
            </Typography>
          </Button>
        </ButtonContainer>
        <Typography
          variant="p"
          fontFamily={"Montserrat"}
          fontSize={11}
          fontWeight="700"
          marginTop={3}
        >
          Login or Sign in to continue*
        </Typography>
      </Card>
    </Container>
  );
}

export default Landing;
