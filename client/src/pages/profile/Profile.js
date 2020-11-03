import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Profile({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <p>Profile</p>
        </Wrapper>
      ) : (
        <p>Profile</p>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
