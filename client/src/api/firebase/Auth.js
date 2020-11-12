import firebase from "firebase/app";
import "firebase/auth";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//function to login with email/password
const loginWithEmailPassword = async (email, password, history) => {
  // if email and password not null
  if (email && password) {
    //1 - login call with username password
    await auth.signInWithEmailAndPassword(email, password).then(
      async (result) => {
        //2 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);

        if (token) {
          //3 - put the token at sessionStorage (We'll use this to make requests)
          sessionStorage.setItem("@token", token);
          //4 - navigate user to the book list
          history.push("/profile");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }
};

//function to login with google
const loginWithGoogle = async (history) => {
  //1 - init Google Auth Provider
  const provider = new firebase.auth.GoogleAuthProvider();
  //2 - create the popup signIn
  await auth.signInWithPopup(provider).then(
    async (result) => {
      //3 - pick the result and store the token
      const token = await auth?.currentUser?.getIdToken(true);

      if (token) {
        //5 - put the token at sessionStorage (We'll use this to make requests)
        sessionStorage.setItem("@token", token);
        //6 - navigate user to the book list
        history.push("/profile");
      }
    },
    function (error) {
      console.log(error);
    }
  );
};

//function to login with email/password
const signUpWithEmailPassword = async (email, password, history) => {
  // if email and password not null
  if (email && password) {
    //1 - login call with username password
    await auth.createUserWithEmailAndPassword(email, password).then(
      async (result) => {
        console.log(result);
        //4 - navigate user to the book list
        history.push("/login");
      },
      function (error) {
        console.log(error);
      }
    );
  }
};

// this function verify the token validity, if valide will refirect to page else redirect to login page
const verifyTokenValidity = async (token, history) => {
  if (token) {
    // calling backend API to validate token
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

    const response = await fetch(`http://localhost:8000/verify-token`, options)
      .then((res) => {
        return res.json();
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });

    // console.log(response.status);
    // console.log(response.message);
  }
};

const getFireBaseProfile = async (token, history, setProfileInformations) => {
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

    const response = await fetch(`http://localhost:8000/profile`, options)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setProfileInformations(json);
      })
      .catch(function (error) {
        if (error.status == 403) {
          history.push("/login");
        }
      });
  }
};

export {
  verifyTokenValidity,
  loginWithEmailPassword,
  loginWithGoogle,
  signUpWithEmailPassword,
  getFireBaseProfile,
};
// https://dev.to/betiol/how-to-handle-authentication-on-node-js-using-firebase-5ajn
