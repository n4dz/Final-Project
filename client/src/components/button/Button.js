import React from "react";
import { useHistory } from "react-router-dom";

import "./Button.css";

export default function Button() {
  const history = useHistory();
  const goToExercises = () => history.push("/exercises");

  return (
    <div class="center">
      <button class="btn" onClick={goToExercises}>
        Get started
      </button>
    </div>
  );
}
