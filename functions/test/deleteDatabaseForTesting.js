/*
This file deletes all entries in the database. This is used for testing.
*/

const FirestoreClient = require("../firestoreClient");
const FS = new FirestoreClient();
FS.deleteCollection("Reports", 10);
FS.deleteCollection("Sites", 10);
FS.deleteCollection("Waste", 10);
FS.deleteCollection("Facilities", 10);
FS.deleteCollection("Employees", 10);

