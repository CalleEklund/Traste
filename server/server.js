const FirestoreClient = require("./firestoreClient");

const express = require("express");
const { validateReport } = require("./firestoreClient");
const {
	Validator,
	ValidationError,
} = require("express-json-validator-middleware");
const reportSchema = {
    type: "object",
    required: ["docketNumber", "docketPicture", "wastePicture", "name", "weight", "timeStamps", "binSize", "facility"],
    properties: {
        docketNumber: {
            type: "string",
            minLength: 1,
        },
        docketPicture: {
            type: "string",
            minLength: 1,
        },
        wastePicture: {
            type: "string",
            minLength: 1,
        },
        name: {
            type: "string",
            minLength: 1,
        },
        weight: {
            type: "integer",
            minimum: 1,
        },
        timeStamps: {
            type: "string",
            minLength: 1,
        },
        binSize: {
            type: "integer",
            minimum: 1,
        },
        facility: {
            type: "string",
            minLength: 1,
        },
    },
};


const app = express();
app.use(express.json())

const { validate } = new Validator();

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

app.post("/create", validate({ body: reportSchema }), async(req, res) => {

    var data = req.body;

    var response = FirestoreClient.createReport(data);

    response = response.then(function(msg) {
        res.send(msg);
    });
    
})

app.use(validationErrorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(`Example app listening at http://localhost:${PORT}`)
);

