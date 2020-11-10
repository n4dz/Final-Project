import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Stats({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <StatsComponent></StatsComponent>
        </Wrapper>
      ) : (
        <StatsComponent></StatsComponent>
      )}
    </>
  );
}

function StatsComponent() {
  return <p>Stats</p>;
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
