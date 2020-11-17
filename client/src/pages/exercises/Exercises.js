import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Exercises.css";
import {
  getExercisesEndpoint,
  postCompletionsEndpoint,
} from "../../api/firebase/Database";

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
  const [gifs, setGifs] = React.useState([]);
  const history = useHistory();
  const currentToken = sessionStorage.getItem("@token");
  const [selectedCategory, setSelectedCategory] = useState("upperbody");
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const goToCompletion = () => {
    postCompletionsEndpoint(
      currentToken,
      history,
      selectedCategory,
      selectedDifficulty
    );

    history.push("/completion");
  };

  // did this here because currentGif requires this state to be fetched
  // calling backend API to GET to get exercises
  React.useEffect(() => {
    getExercisesEndpoint(currentToken, history, setGifs, selectedCategory);
  }, []);

  const difficultyTime = [1, 30, 60];
  const [starter, setStarter] = useState(false);
  const [showCompletionButton, setShowCompletionButton] = useState(false);

  const [counter, setCounter] = React.useState(difficultyTime[0]);
  const [currentGif, setCurrentGif] = React.useState(3 - 1);

  const playStarter = () => {
    if (starter === false) {
      setStarter(true);
    }
  };

  const pauseStarter = () => {
    if (starter === true) {
      setStarter(false);
    }
  };

  const handleChangeDifficulty = (event) => {
    if (event.target.value === "beginner") {
      setCounter(difficultyTime[0]);
    } else if (event.target.value === "intermediate") {
      setCounter(difficultyTime[1]);
    } else {
      setCounter(difficultyTime[2]);
    }

    setSelectedDifficulty(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    getExercisesEndpoint(currentToken, history, setGifs, event.target.value);
  };

  if (starter === true) {
    setTimeout(function () {
      if (counter === 0) {
        if (currentGif > 0) {
          if (selectedDifficulty === "beginner") {
            setCounter(difficultyTime[0]);
          } else if (selectedDifficulty === "intermediate") {
            setCounter(difficultyTime[1]);
          } else {
            setCounter(difficultyTime[2]);
          }

          setCurrentGif(currentGif - 1);
        } else {
          setStarter(false);

          setCounter(0);
          setShowCompletionButton(true);
          return;
        }
      } else if (counter > 0) {
        setCounter(counter - 1);
        return;
      }
    }, 1000);
  } else {
    clearTimeout();
  }

  return (
    <ExercicesWrapper>
      <Title>
        {!starter ? (
          <>
            <h2>Category</h2>
            <select value={selectedCategory} onChange={handleChangeCategory}>
              <option value="upperbody">Upper body</option>
              <option value="lowerbody">Lower body</option>
              <option value="cardio">Cardio</option>
              <option value="yoga">Yoga</option>
            </select>
            <br />
            <br />
            <p>Difficulty</p>
            <select
              value={selectedDifficulty}
              onChange={handleChangeDifficulty}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>
          </>
        ) : (
          <h2>Keep pushing!</h2>
        )}
      </Title>

      {/* <span> */}
      {!starter ? (
        <ExercicesCard>
          <FaPlay color="white" size="40px" onClick={playStarter}></FaPlay>
        </ExercicesCard>
      ) : (
        <ExercicesCard2
          style={{
            backgroundImage: `url(${gifs[currentGif]})`,
          }}
        >
          <FaPause
            className="pauseIcon"
            color="white"
            size="40px"
            onClick={pauseStarter}
          ></FaPause>
        </ExercicesCard2>
      )}

      <ExercicesTimer>
        {showCompletionButton ? (
          <button className="completedButton" onClick={goToCompletion}>
            {" "}
            Completed !{" "}
          </button>
        ) : (
          <p>{counter}</p>
        )}
      </ExercicesTimer>
    </ExercicesWrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 15%;
`;

const ExercicesWrapper = styled.div`
  background-image: url("https://www.rdellatraining.com/wp-content/uploads/2014/12/KBMinimalism.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
  text-align: left;
  padding-top: 5%;
  padding-left: 5%;
`;

const ExercicesCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  height: 40%;
  padding-top: 8%;
  margin: auto;
  background-color: #1c1e2e;
`;

const ExercicesCard2 = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  height: 40%;
  padding-top: 8%;
  margin: auto;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ExercicesTimer = styled.h1`
  color: white;
  padding-left: 72%;
`;
