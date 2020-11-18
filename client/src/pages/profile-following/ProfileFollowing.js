import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ProfileCard from "../../components/profile-card/ProfileCard";
import { getFollowingEndpoint } from "../../api/firebase/Database";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function ProfileFollowing({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <ProfileFollowingComponent></ProfileFollowingComponent>
        </Wrapper>
      ) : (
        <ProfileFollowingComponent></ProfileFollowingComponent>
      )}
    </>
  );
}

function ProfileFollowingComponent() {
  const history = useHistory();
  const currentToken = sessionStorage.getItem("@token");

  const [followings, setFollowings] = useState([]);

  React.useEffect(() => {
    getFollowingEndpoint(currentToken, history, setFollowings);
  }, []);
  return (
    <>
      <CardWrapper>
        {followings.map(function (following, index) {
          return (
            <>
              <ProfileCard email={following.following_email}></ProfileCard>
            </>
          );
        })}
      </CardWrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const CardWrapper = styled.div`
  padding-top: 5%;
`;
