import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { signUpWithEmailPassword } from "../../api/firebase/Auth";

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
  //useHistory when onClick on logo to redirect to SignUp page and profile page
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doSignUpWithEmailPassword = async () => {
    signUpWithEmailPassword(email, password, history);
  };

  return (
    <SignUpWrapper>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        required
      ></input>
      <input
        type="submit"
        value="Sign Up"
        onClick={doSignUpWithEmailPassword}
      ></input>
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
