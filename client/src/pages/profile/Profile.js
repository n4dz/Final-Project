import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BiTime } from "react-icons/bi";
import {
  verifyTokenValidity,
  getFireBaseProfile,
} from "../../api/firebase/Auth";
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
  const currentToken = sessionStorage.getItem("@token");

  const [profileInformations, setProfileInformations] = useState("");
  const [connectionTime, setConnectionTime] = useState(
    "Show last connection time"
  );

  const editConnectionTime = async () => {
    // verifyTokenValidity(currentToken, history);
    // console.log(profileInformations.metadata.lastSignInTime);
    setConnectionTime(profileInformations.metadata.lastSignInTime);
  };

  // function redirect to followers page
  const goToProfileFollowers = () => history.push("/profile/followers");
  // function redirect to following page
  const goToProfileFollowing = () => history.push("/profile/following");

  // calling backend API to GET specific company name
  React.useEffect(() => {
    getFireBaseProfile(currentToken, history, setProfileInformations);
    // sleep(5000).then(() => {
    //   console.log("done");
    // });

    // console.log(profileInformations.metadata.lastSignInTime);
  }, []);

  // let aaa = profileInformations["metadata"].lastSignInTime;
  // let metadata = profileInformations.metadata.lastSignInTime;

  return (
    <>
      <ProfileWrapper>
        <ProfileCard>
          <ProfileImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"></ProfileImg>

          <ProfileName>{profileInformations.email}</ProfileName>
          {/* <Address>{profileInformations.metadata.lastSignInTime}</Address> */}
          {/* {profileInformations.metadata.values((val) => (
            <Address>{val.lastSignInTime}</Address>
          ))} */}
          <br />
          <p onClick={goToProfileFollowing}>
            <span class="badge">332</span> Following
          </p>
          <br />
          <p onClick={goToProfileFollowers}>
            <span class="badge">124</span> Followers
          </p>
          <br />
          <p onClick={editConnectionTime}>
            <span>
              <BiTime color="blue"></BiTime> {connectionTime}
            </span>
          </p>
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
//   background-image: url("https://cdn.shopify.com/s/files/1/0097/2944/1856/files/col-gym-accessories_e6dd4062-b8cc-4f42-8b5f-5a14a2393001.jpg");
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
