import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "./Login.css";
import {
  loginWithEmailPassword,
  loginWithGoogle,
} from "../../api/firebase/Auth";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Login({ sidebarStatus }) {
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
  //useHistory when onClick on logo to redirect to SignUp page and profile page
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function redirect to signup page
  const goToSignUp = () => history.push("/signup");

  const doLoginWithEmailPassword = async () => {
    loginWithEmailPassword(email, password, history);
  };

  const doLoginWithGoogle = async () => {
    loginWithGoogle(history);
  };

  return (
    <LoginWrapper>
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
        value="Login"
        onClick={doLoginWithEmailPassword}
      ></input>
      <a class="google btn" onClick={doLoginWithGoogle}>
        Login with Google
      </a>
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
