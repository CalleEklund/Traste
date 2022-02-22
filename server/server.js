/*
This file contains functions for deplyoing the firebase database locally.
*/

const FirestoreClient = require("./firestoreClient");
const express = require("express");
const {
	Validator,
	ValidationError,
} = require("express-json-validator-middleware");
const { reportSchema, siteSchema}  = require('./databaseSchemas');
const app = express();
app.use(express.json());

const { validate } = new Validator();

/*
This function validates the get request and returns the correct error code.
*/
function validationErrorMiddleware(error, request, response, next) {
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

/*
This if the function for posting on localhost/3000/createreport.
This is for testing the createreport function.
*/
app.post("/createreport", validate({ body: reportSchema }),  async(req, res) => {
    var data = req.body;
    var response = FirestoreClient.createReport(data);
    console.log(response)
    response = response.then(function(msg) {
        res.send(msg);
    }).catch(err => {
        res.send(JSON.stringify({"error": err.message}));
   })
})

/*
This if the function for posting on localhost/3000/createsite.
This is for testing the createsite function.
*/
app.post("/createsite", validate({ body: siteSchema }),  async(req, res) => {
    var data = req.body;
    var response = FirestoreClient.createSite(data);
    console.log(response)
    response = response.then(function(msg) {
        res.send(msg);
    }).catch(err => {
        res.send(JSON.stringify({"error": err.message}));
   })
})

app.use(validationErrorMiddleware);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = {app};

