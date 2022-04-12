const express = require("express");
const {Validator} = require("express-json-validator-middleware");
const cors = require("cors")({origin: true});
const app = express();
app.use(cors);


app.listen(3000, function() {
  console.log("server is running");
});

module.exports = app;


