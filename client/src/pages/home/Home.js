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
  background-image: url("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/239160/f2b81de7d19eb3d3dcea52ab5011d8fcf0f4c97a.jpg");
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
