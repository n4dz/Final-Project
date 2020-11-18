import React from "react";
import styled from "styled-components";

import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

export default function ProfileCard({ email }) {
  return (
    <ProfileCardWrapper>
      {/* <ImgWrapper
            style={{ backgroundImage: `url(${itemData.imageSrc})` }}
          /> */}
      <ProfileCardImgWrapper
        style={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png)`,
        }}
      ></ProfileCardImgWrapper>
      <ProfileCardName>{email}</ProfileCardName>
      {/* <Button>
        <RiUserFollowLine color="white" />
      </Button> */}
    </ProfileCardWrapper>
  );
}

const ProfileCardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 12vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 2%;
  padding: 15px;
`;

const ProfileCardImgWrapper = styled.div`
  width: 65px;
  height: 65px;
  margin: 2%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ProfileCardName = styled.h2`
  flex: 2;
  margin: 2%;
`;

const Button = styled.button`
  position: absolute;
  top: 25px;
  right: 15px;
  padding: 0;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #4caf50;
  border: none;
  outline: none;
  &:hover {
    background-color: red;
  }
`;
