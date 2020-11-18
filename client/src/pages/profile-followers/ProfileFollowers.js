import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ProfileCard from "../../components/profile-card/ProfileCard";
import { getFollowersEndpoint } from "../../api/firebase/Database";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function ProfileFollowers({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <ProfileFollowersComponent></ProfileFollowersComponent>
        </Wrapper>
      ) : (
        <ProfileFollowersComponent></ProfileFollowersComponent>
      )}
    </>
  );
}

function ProfileFollowersComponent() {
  const history = useHistory();
  const currentToken = sessionStorage.getItem("@token");

  const [followers, setFollowers] = useState([]);

  React.useEffect(() => {
    getFollowersEndpoint(currentToken, history, setFollowers);
  }, []);

  return (
    <>
      <CardWrapper>
        {followers.map(function (follower, index) {
          return (
            <>
              <ProfileCard email={follower.follower_email}></ProfileCard>
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
