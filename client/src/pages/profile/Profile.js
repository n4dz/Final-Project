import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { verifyTokenValidity } from "../../api/firebase/Auth";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Profile({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <ProfileComponent></ProfileComponent>
        </Wrapper>
      ) : (
        <ProfileComponent></ProfileComponent>
      )}
    </>
  );
}

function ProfileComponent() {
  const history = useHistory();

  const isUserAuthenticated = async () => {
    const currentToken = sessionStorage.getItem("@token");
    verifyTokenValidity(currentToken, history);
  };

  return (
    <>
      <p>Profile</p>
      <button onClick={isUserAuthenticated}>Profile</button>
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
