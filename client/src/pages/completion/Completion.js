import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "./Completion.css";
import { getCompletionsEndpoint } from "../../api/firebase/Database";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Completion({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <CompletionComponent></CompletionComponent>
        </Wrapper>
      ) : (
        <CompletionComponent></CompletionComponent>
      )}
    </>
  );
}

function CompletionComponent() {
  const history = useHistory();
  const currentToken = sessionStorage.getItem("@token");

  const [completions, setCompletions] = useState([]);

  React.useEffect(() => {
    getCompletionsEndpoint(currentToken, history, setCompletions);
  }, []);

  return (
    <CompletionWrapper>
      <Title>You made it !</Title>
      {completions.map(function (completion, index) {
        return (
          <>
            <CompletionCard className="completionCard">
              <br />
              <h1>Good job!</h1>
              <br />
              <h2>{completion.exercise}</h2>
              <h3>{completion.difficulty}</h3>
              <br />
              <h4>{completion.date}</h4>
            </CompletionCard>
          </>
        );
      })}
    </CompletionWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const CompletionWrapper = styled.div`
  /* background-image: url("https://i.fbcd.co/products/original/7be4c7480aa46d55be5df940227607fd9e9307bcb36bd1d0613301844e2e769f.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%; */
  /* background-color: #dce1e9;
  height: 100vh; */
  padding-bottom: 2%;
`;

const Title = styled.h1`
  color: red;
  padding: 5%;
`;

const CompletionCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
  width: 50%;
  height: 30%;
  margin: 2%;
`;
