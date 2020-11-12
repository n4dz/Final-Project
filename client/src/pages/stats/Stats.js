import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Stats({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <StatsComponent />
        </Wrapper>
      ) : (
        <StatsComponent />
      )}
    </>
  );
}

function StatsComponent() {
  return (
    <StatsWrapper>
      <Title>
        C O M M I N G <br /> S O O N !
      </Title>
    </StatsWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const StatsWrapper = styled.div`
  background-image: url("https://i.pinimg.com/736x/08/71/21/0871211a6ee2a67d93eedacf697457aa.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
`;

const Title = styled.h2`
  color: black;
  text-align: center;
  padding-top: 20%;
`;
