const {google} = require("googleapis");
const sheets = google.sheets("v4");

const serviceAccount = require("./traste-71a71.json");

const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const jwtAuthPromise = jwtClient.authorize();

const getObjectValues = (obj) => (obj && typeof obj === "object") ?
    Object.values(obj).map(getObjectValues).flat() :
    [obj];

/**
 * Appends the new report to the google sheet
 * @param {*} data Reportdata
 */
async function syncData(data) {
  console.log(data);
  const finalData = [getObjectValues(data)];
  await jwtAuthPromise;
  await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: "1-Ihe6vu4Nchp_CN1WqOSAiICXBZHhqdORCk6FriFMaE",
    range: "Sheet1!A1:E1",
    valueInputOption: "RAW",
    requestBody: {values: finalData, majorDimension: "ROWS"},
  }, {});
}

module.exports = {syncData};
