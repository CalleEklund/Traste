/*
This file contains functions for deplyoing the firebase database locally.
*/

const {FirestoreClient, uploadImage} = require("./firestoreClient.js");

const FS = new FirestoreClient();
const bodyParser = require("body-parser");


// const {syncData} = require("./syncData");

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors")({origin: true});
const {Validator, ValidationError} =
    require("express-json-validator-middleware");

const {reportSchema} =
    require("./databaseSchemas");

const app = express();

app.use(cors);

// Fixing bug where body cant be parsed when testing the integration.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const {validate} = new Validator();

/**
 * This function validates the get request and returns the correct error code.
 * @param {*} error
 * @param {*} _request
 * @param {*} response
 * @param {*} next
 * @return {*} next
 */
function validationErrorMiddleware(error, _request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  response.status(400).json({
    errors: error.validationErrors,
  });
  next();
}

app.post("/uploadimage", function(req, res) {
  const data = req.body;
  uploadImage(data).then((imageURL) =>{
    res.send(imageURL);
  });
});


/*
This is the function for posting on localhost/3000/createreport.
This is for testing the createreport function.
*/


app.post("/createreport", validate({body: reportSchema}), (req, res) => {
  const data = req.body;
  console.log("/createrep, data:", data);
  if (validatePicureUrl(data.docketPicture) &&
  validatePicureUrl(data.wastePicture)) {
    const response = FS.createReport(data);
    response.then(function(msg) {
      res.send(msg);
      // syncData(data);
    });
  } else {
    res.statusCode = 400;
    res.send(JSON.stringify({"error": "Invalid url"}));
  }
});

/**
 * Returns all reports and sends it to HistoryPage
 */
app.get("/getAllReports", async (req, res)=>{
  const resp = await FS.getAllReports();
  res.send(resp);
});


function validatePicureUrl(picture) {
  let url;

  try {
    url = new URL(picture);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

app.use(validationErrorMiddleware);

exports.app = functions.region("europe-west3").https.onRequest(app);
