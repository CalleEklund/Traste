/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
// const functions = require("firebase-functions");

const { google } = require("googleapis");
const sheets = google.sheets("v4");

const serviceAccount = require("./traste-71a71.json");

const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const jwtAuthPromise = jwtClient.authorize();


async function syncData(data) {
    console.log(data);
    const finalData = [[data.date, data.docketNumber, data.weight, data.binSize, data.site, data.timeStamps]];
    await jwtAuthPromise;
    await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: "1-Ihe6vu4Nchp_CN1WqOSAiICXBZHhqdORCk6FriFMaE",
        range: "Sheet1!A1:E1",
        valueInputOption: "RAW",
        requestBody: { values: finalData, majorDimension: "ROWS" },
    }, {});
}

module.exports = { syncData };
