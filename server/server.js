const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const admin = require("firebase-admin");
const { verifyToken } = require("./handlers");

// get acces to serviceAccountKey file (firebase credentials)
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://final-project-8233b.firebaseio.com",
// });

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./client/build"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // Endpoints
  .post("/verify-token", verifyToken)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
