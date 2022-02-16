const { assert } = require('@firebase/util');
const Firestore = require('@google-cloud/firestore');
const path = require('path');
const { db } = require('./config');





class FirestoreClient {
    constructor() {
        this.firestore = new Firestore({
            projectId: "traste-71a71",
            keyFilename: path.join(__dirname, './service_account.json')
        })
    }
    createReport (data) {

        const reportData = {
            docketNumber: data.docketNumber, //INT
            docketPicture: data.docketPicture, // PNG
            wastePicture: data.wastePicture, // JPG
            name: data.name, // STRING
            weight: data.weight, // FLOAT
            timestamps: data.timeStamps, //DATE
            binSize: data.binSize, // INT
            facility: data.facility // STRING
          };
        var response = this.firestore.collection('Reports').doc(data.docketNumber).get()
        .then (async doc =>{
            if (doc.exists){
                return {msg: "Report already exists!"};
            } else {
                await this.firestore.collection('Reports').doc(data.docketNumber).set(reportData); 
                return {msg: 'report was made'};
            }
        })
        .catch(err => {
            console.error('Error making report', err);
        })
        return response;
    }
}

module.exports = new FirestoreClient();