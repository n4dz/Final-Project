import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Home({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <HomeComponent />
        </Wrapper>
      ) : (
        <HomeComponent />
      )}
    </>
  );
}

function HomeComponent() {
  return (
    <HomeWrapper>
      <Title>W E L C O M E !</Title>
      <Button></Button>
    </HomeWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const HomeWrapper = styled.div`
  background-image: url("https://img4.goodfon.com/wallpaper/big/0/34/beg-kedy-krosovki-krosy-voda-bryzgi-naik-nogi.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  padding-top: 5%;
`;
