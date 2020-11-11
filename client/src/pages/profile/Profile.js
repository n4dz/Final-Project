import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { verifyTokenValidity } from "../../api/firebase/Auth";
import "./Profile.css";

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

  // function redirect to followers page
  const goToProfileFollowers = () => history.push("/profile/followers");
  // function redirect to following page
  const goToProfileFollowing = () => history.push("/profile/following");

  return (
    <>
      <ProfileWrapper>
        <ProfileCard>
          <ProfileImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"></ProfileImg>

          <ProfileName>Elvis Presley</ProfileName>
          <Address>Canada</Address>
          <p onClick={goToProfileFollowing}>
            <span class="badge">332</span> Following
          </p>
          <br />
          <p onClick={goToProfileFollowers}>
            <span class="badge">124</span> Followers
          </p>
          {/* <button onClick={isUserAuthenticated}>Profile</button> */}
        </ProfileCard>
      </ProfileWrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const ProfileWrapper = styled.div`
  color: black;
  text-align: center;
  padding-top: 5%;
`;

const ProfileCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  padding-top: 5%;
  padding-bottom: 5%;
  margin: auto;
`;

const ProfileImg = styled.img`
  width: 12%;
  height: 12%;
`;

// const ProfileWrapper = styled.div`
//   background-image: url("https://www.pixelstalk.net/wp-content/uploads/2016/04/Images-free-abstract-minimalist-wallpaper-HD.jpg");
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
//   height: 100vh;
// `;

const ProfileName = styled.h1`
  color: black;
  padding-top: 3%;
`;

const Address = styled.h2`
  color: black;
  padding-bottom: 5%;
`;
