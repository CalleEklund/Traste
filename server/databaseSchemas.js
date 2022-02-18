/*
This file contains the schemas ov different structures in the database.
*/

var reportSchema = {
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

module.exports = {reportSchema};