const FirestoreClient = require("./firestoreClient");

const express = require("express");

const app = express();
app.use(express.json())


FirestoreClient.createReport("ERIK", 2, "HEJ ANDREAS", "Linus", 10000, "5 maj", 2, "Linköping center");




app.post("/create", async(req, res) => {

})
