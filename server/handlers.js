"use strict";

const admin = require("firebase-admin");
//https://dev.to/betiol/how-to-handle-authentication-on-node-js-using-firebase-5ajn
// get acces to serviceAccountKey file (firebase credentials)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://final-project-8233b.firebaseio.com",
});

// firebase authentication database
const firebaseAuth = admin.auth();

// const firebase = require("firebase/app");
// require("firebase/auth");

// const apiKey = process.env.FIREBASE_API_KEY;
// const fb = firebase.initializeApp({
//   apiKey: "AIzaSyA-RqzJmUjnKvHkuq4Ta9H6yMlHEcBjw9s",
// });

// const loginUser = async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // data input body validation
//   if (username && password) {
//     admin
//       .auth()
//       .signInWithEmailAndPassword(username, password)
//       // https://firebase.google.com/docs/auth/web/password-auth
//       .catch(function (error) {
//         // Handle Errors here.
//         return res.status(403).json({
//           status: 403,
//           message: error.message,
//         });
//       });
//   } else {
//     return res.status(404).json({
//       status: 404,
//       message: "Unable to login.",
//     });
//   }
// };

// endpoint function
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
const verifyToken = async (req, res) => {
  const token = req.body.token;

  if (token) {
    firebaseAuth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        // valid token
        return res.status(200).json({
          status: 200,
          message: "CA MARCHE ESTI",
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

module.exports = {
  verifyToken,
};
