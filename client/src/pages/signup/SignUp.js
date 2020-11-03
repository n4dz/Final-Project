import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function SignUp({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <SignUpComponent />
        </Wrapper>
      ) : (
        <SignUpComponent />
      )}
    </>
  );
}

function SignUpComponent() {
  return (
    <SignUpWrapper>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      <input type="submit" value="Sign Up"></input>
    </SignUpWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const SignUpWrapper = styled.div`
  width: 30%;
  height: 40%;
  margin: auto;
  padding-top: 10%;
`;
