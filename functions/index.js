/*
This file contains functions for deplyoing the firebase database locally.
*/

const {FirestoreClient, uploadImage} = require("./firestoreClient.js");

const FS = new FirestoreClient();


// const {syncData} = require("./syncData");

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors")({origin: true});
const {Validator, ValidationError} =
    require("express-json-validator-middleware");

const {siteSchema, reportSchema, wasteSchema, employeeSchema, facilitySchema} =
    require("./databaseSchemas");

const app = express();

app.use(cors);


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


app.post("/createreport", (req, res) => {
  const data = req.body;
  console.log("test data", req.data);
  if (validatePicureUrl(data.docketPicture) &&
  validatePicureUrl(data.wastePicture)) {
    const response = FS.createReport(data);
    response.then(function(msg) {
      res.send(msg);
      // syncData(data);
    }).catch((err) => {
      res.send(JSON.stringify({"error": err.message}));
    });
  } else {
    res.statusCode = 400;
    res.send(JSON.stringify({"error": "Invalid url"}));
  }
});

/*
This is the function for posting on localhost/3000/createsite.
This is for testing the createsite function.
*/
app.post("/createsite", validate({body: siteSchema}), (req, res) => {
  const data = req.body;
  console.log("HEJ");

  let response = FS.createSite(data);
  console.log(response);
  response = response.then(function(msg) {
    res.header("Access-Control-Allow-Origin", "*" );
    res.send(msg);
  }).catch((err) => {
    res.header("Access-Control-Allow-Origin", "*" );
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
This is the function for posting on localhost/3000/createwaste.
This is for testing the createwaste function.
*/
app.post("/createwaste", validate({body: wasteSchema}), (req, res) => {
  const data = req.body;
  let response = FS.createWaste(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
This is the function for posting on localhost/3000/createfacility
This is for testing.
*/
app.post("/createfacility", validate({body: facilitySchema}), (req, res) => {
  const data = req.body;
  let response = FS.createFacility(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
This is the function for posting on localhost/3000/createemployee
This is for testing.
*/
app.post("/createemployee", validate({body: employeeSchema}), (req, res) => {
  const data = req.body;
  let response = FS.createEmployee(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

function validatePicureUrl(picture) {
  let url;

  try {
    url = new URL(picture);
  } catch (error) {
    return false;
  }
  console.log(url.protocol);
  return url.protocol === "http:" || url.protocol === "https:";
}

app.use(validationErrorMiddleware);

app.get("/test", (req, res)=>{
  res.send({"msg": "OK!"});
});

app.post("/simple", (req, res)=>{
  console.log("/simple body", req);
  res.send({"msg": "OK!!"});
});

app.listen(3000, ()=>{
  console.log("server is running");
});

exports.app = functions.region("europe-west3").https.onRequest(app);
