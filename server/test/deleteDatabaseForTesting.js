/*
This file deletes all entries in the database. This is used for testing.
*/

const FirestoreClient = require("../firestoreClient");
FirestoreClient.deleteCollection('Reports', 10);