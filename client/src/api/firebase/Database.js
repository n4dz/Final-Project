import jwt from "jwt-decode";

const getExercisesEndpoint = async (
  token,
  history,
  setGifs,
  categoryParameter
) => {
  if (token) {
    // calling backend API to get firebase exercise info
    // using Authorization header to pass token since we do a GET request
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469 (BE)
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(
      `http://localhost:8000/exercises/` + categoryParameter,
      options
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setGifs(json);
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

const postCompletionsEndpoint = async (
  token,
  history,
  exercise,
  difficulty
) => {
  if (token) {
    let jsonBody = {
      exercise: exercise,
      difficulty: difficulty,
    };
    // console.log(jwt(token).user_id);
    // calling backend API to get firebase profile info
    // using Authorization header to pass token since we do a GET request
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469 (BE)
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonBody),
    };

    const response = await fetch(`http://localhost:8000/completions`, options)
      .then((res) => {
        return res.json();
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

const getCompletionsEndpoint = async (token, history, setCompletions) => {
  if (token) {
    // calling backend API to get firebase profile info
    // using Authorization header to pass token since we do a GET request
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469 (BE)
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(
      `http://localhost:8000/completions/` + jwt(token).user_id,
      options
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCompletions(json);
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

const getFollowersEndpoint = async (token, history, setFollowers) => {
  if (token) {
    // calling backend API to get firebase profile info
    // using Authorization header to pass token since we do a GET request
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469 (BE)
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(`http://localhost:8000/followers`, options)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setFollowers(json);
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

const getFollowingEndpoint = async (token, history, setFollowing) => {
  if (token) {
    // calling backend API to get firebase profile info
    // using Authorization header to pass token since we do a GET request
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469 (BE)
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(`http://localhost:8000/following`, options)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setFollowing(json);
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

export {
  getExercisesEndpoint,
  postCompletionsEndpoint,
  getCompletionsEndpoint,
  getFollowersEndpoint,
  getFollowingEndpoint,
};
