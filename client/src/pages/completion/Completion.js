import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Completion({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <p>Completion</p>
        </Wrapper>
      ) : (
        <p>Completion</p>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
