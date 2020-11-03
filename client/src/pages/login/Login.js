import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "./Login.css";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Login({ sidebarStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <LoginComponent />
        </Wrapper>
      ) : (
        <LoginComponent />
      )}
    </>
  );
}

function LoginComponent() {
  //useHistory when onClick on logo to redirect to SignUp page

  const history = useHistory();
  const goToSignUp = () => history.push("/signup");

  return (
    <LoginWrapper>
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
      <input type="submit" value="Login"></input>
      <a class="google btn">Login with Google</a>
      <a class="signup btn" onClick={goToSignUp}>
        Sign Up{" "}
      </a>
    </LoginWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
const LoginWrapper = styled.div`
  width: 30%;
  height: 40%;
  margin: auto;
  padding-top: 10%;
`;
