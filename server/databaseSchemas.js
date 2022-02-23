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

var siteSchema = {
    type: "object",
    required: ["adress", "name"],
    properties: {
        adress: {
            type: "string",
            minLength: 1,
        },
        name: {
            type: "string",
            minLength: 1,
        },
    },
};

var wasteSchema = {
    type: "object",
    required: ["materialName", "density"],
    properties: {
        materialName: {
            type: "string",
            minLength: 1,
        },
        density: {
            type: "number",
            minimum: 0,
        },
    }
    
};

var facilitySchema = {
    type: "object",
    required: ["facilityId", "location"],
    properties: {
        facilityId: {
            type: "string",
            minLength: 1,
        },
        location: {
            type: "string",
            minlength: 1,
        },
    }
    
};

var employeeSchema = {
    type: "object",
    required: ["employeeId", "name", "email", "password", "isDeleted", "facilityId"],
    properties: {
        employeeId: {
            type: "string",
            minLength: 1,
        },
        name: {
            type: "string",
            minlength: 1,
        },
        email: {
            type: "string",
            minlength: 1,
        },
        password: {
            type: "string",
            minlength: 1,
        },
        isDeleted: {
            type: "boolean"
        },
        facilityId: {
            type: "string",
            minlength: 1,
        },
    }
    
};

module.exports = {reportSchema, wasteSchema, siteSchema, facilitySchema, employeeSchema};
