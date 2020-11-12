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

module.exports = {
  verifyToken,
  getProfile,
};
