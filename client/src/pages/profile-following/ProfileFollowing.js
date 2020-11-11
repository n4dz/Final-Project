import React from "react";
import styled from "styled-components";
import ProfileCard from "../../components/profile-card/ProfileCard";

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
  return (
    <>
      <CardWrapper>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>

        {/* {Object.keys(cart.indexes).map((element, index) => (
            <ProfileCard
              key={`item-order-${index}`}
              id={element}
              qty={cart.indexes[element]}
              setTotal={setTotal}
              total={total}
            />
          ))} */}
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
