import React from "react";
import styled from "styled-components";

//giving status as paramater so when sidebar in OnClick the text will have Wrapper for a padding-left
export default function Exercises({ sidebarStatus }) {
  return (
    <>
      {sidebarStatus ? (
        <Wrapper>
          <ExercisesComponent></ExercisesComponent>
        </Wrapper>
      ) : (
        <ExercisesComponent></ExercisesComponent>
      )}
    </>
  );
}

function ExercisesComponent() {
  return <p>Exercises</p>;
}

const Wrapper = styled.div`
  padding-left: 15%;
`;
