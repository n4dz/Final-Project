"use strict";

const admin = require("firebase-admin");
const jwt_decode = require("jwt-decode");
const { v4: uuidv4 } = require("uuid");

//https://dev.to/betiol/how-to-handle-authentication-on-node-js-using-firebase-5ajn
// get acces to serviceAccountKey file (firebase credentials)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://final-project-8233b.firebaseio.com",
});

// firebase authentication database
const firebaseAuth = admin.auth();
const firebaseDatabase = admin.database();

// read database
const queryDatabase = async (key) => {
  const ref = firebaseDatabase.ref(key);
  let data;
  await ref.once(
    "value",
    (snapshot) => {
      data = snapshot.val();
    },
    (err) => {
      console.log(err);
    }
  );

  return data;
};

// save in database. Using uuid for unik Id to insert complete exercises in completion page
// https://firebase.google.com/docs/database/admin/save-data#section-set
// https://www.npmjs.com/package/uuid
const insertDatabase = (key, data) => {
  const ref = firebaseDatabase.ref(key);
  const completionRef = ref.child(uuidv4());

  let response;
  completionRef.update(data, (err) => {
    console.log(err);
  });

  return response;
};

// endpoint function
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
const verifyToken = async (req, res) => {
  // const token = req.body.token;
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        // valid token
        return res.status(200).json({
          status: 200,
          message: true,
        });
      })
      .catch(function (error) {
        // expired or invalid token
        return res.status(403).json({
          status: 403,
          message: false,
        });
      });
  } else {
    // empty value of token
    return res.status(404).json({
      status: 404,
      message: false,
    });
  }
};

// https://firebase.google.com/docs/reference/admin/node/admin.auth.UserInfo
// https://jwt.io/
const getProfile = async (req, res) => {
  // const token = req.body.token;
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        // valid token

        firebaseAuth
          .getUser(decodedToken["user_id"])
          .then((userRecord) => {
            return res.status(200).json(userRecord.toJSON());
          })
          .catch(function (error) {
            // expired or invalid token
            return res.status(403).json({
              status: 403,
              message: "Unable to get user records.",
            });
          });
      })
      .catch(function (error) {
        // expired or invalid token
        return res.status(403).json({
          status: 403,
          message: false,
        });
      });
  } else {
    // empty value of token
    return res.status(404).json({
      status: 404,
      message: false,
    });
  }
};

// this function will return either the user object or false.
const getExercisesFromDB = async (category) => {
  const data = (await queryDatabase(`category/` + category)) || {};
  const dataValue = Object.keys(data).map((item) => data[item]);
  // .find((obj) => obj.category === category);

  return dataValue || false;
};

const getExercises = async (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const category = req.params.category;

  if (token) {
    const returningExercises = await getExercisesFromDB(category);

    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        return res.status(200).json(returningExercises);
        // return dataValue || false;
      })
      .catch(function (error) {
        // expired or invalid token
        return res.status(403).json({
          status: 403,
          message: false,
        });
      });
  } else {
    // empty value of token
    return res.status(404).json({
      status: 404,
      message: false,
    });
  }
};

// function to POST exercices completed in firebase
const postCompletionsFromDB = (exercise, difficulty, user_id) => {
  const data =
    insertDatabase("completion", {
      exercise: exercise,
      difficulty: difficulty,
      date: new Date(),
      user_id: user_id,
    }) || {};

  return data || false;
};

const postCompletions = (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  const exercise = req.body.exercise;
  const difficulty = req.body.difficulty;
  let dateTime = new Date();
  let userid = jwt_decode(token).user_id;

  if (token) {
    const insertingCompletionsByUserId = postCompletionsFromDB(
      exercise,
      difficulty,
      userid
    );

    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        userid = decodedToken["user_id"];
        return res.status(200).json(insertingCompletionsByUserId);
      })
      .catch(function (error) {
        // expired or invalid token
        return res.status(403).json({
          status: 403,
          message: false,
        });
      });
  } else {
    // empty value of token
    return res.status(404).json({
      status: 404,
      message: false,
    });
  }
};

// function to GET exercices done to post in completion
const getCompletionsByUserIdFromDB = async (userid) => {
  const data = (await queryDatabase(`completion`)) || {};
  const dataValue = Object.keys(data).map((item) => data[item]);
  // .find((obj) => obj.user_id === userid);

  // console.log(dataValue);
  let completionOfUser = dataValue.filter((it) => it.user_id === userid);

  console.log(completionOfUser);

  return completionOfUser || false;
};

const getCompletionsByUserId = async (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const userid = req.params.userId;

  if (token) {
    const returningCompletionsByUserId = await getCompletionsByUserIdFromDB(
      userid
    );

    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        return res.status(200).json(returningCompletionsByUserId);
      })
      .catch(function (error) {
        // expired or invalid token
        return res.status(403).json({
          status: 403,
          message: false,
        });
      });
  } else {
    // empty value of token
    return res.status(404).json({
      status: 404,
      message: false,
    });
  }
};

module.exports = {
  verifyToken,
  getProfile,
  getExercises,
  getCompletionsByUserId,
  postCompletions,
};
