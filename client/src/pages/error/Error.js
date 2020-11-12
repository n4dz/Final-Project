import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <>
      <ErrorImg src="https://freefrontend.com/assets/img/html-funny-404-pages/SVG-Animation-404-Page.gif"></ErrorImg>
    </>
  );
};

const ErrorImg = styled.img`
  width: 100%;
  height: 100vh;
`;

export default Error;
