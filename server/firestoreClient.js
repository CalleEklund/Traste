/*
This file contains the Firebase Class.
It initiliazez the firebase database and handles all the functions for adding, 
changing and deleting entries in the database.
*/

const Firestore = require('@google-cloud/firestore');
const path = require('path');

class FirestoreClient {
    constructor() {
        this.firestore = new Firestore({
            projectId: "traste-71a71",
            keyFilename: path.join(__dirname, './service_account.json')
        })
    }

    /*
    This function deletes all entries of specific collection.
    params collectionPath, batchSize
    returns promise
    */
    async deleteCollection(collectionPath, batchSize) {
        const collectionRef = this.firestore.collection(collectionPath);
        const query = collectionRef.orderBy('__name__').limit(batchSize);
      
        return new Promise((resolve, reject) => {
          deleteQueryBatch(this.firestore, query, resolve).catch(reject);
        });
      }
    
     /*
    This function creates a report from data.
    If data is not formatted correctly a error code will be provided
    params data
    returns promise
    */
    async createReport (data) {

        const reportData = {
            docketNumber: data.docketNumber, //STRING
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
                return JSON.stringify({msg: "Report already exists"});
            } else {
                await this.firestore.collection('Reports').doc(data.docketNumber).set(reportData); 
                return JSON.stringify({msg: 'Report was made'});
            }
        })
        return response;
    }
    /*
    This function is used to log different types of waste.
    Waste is included in logging a report in the database.
    params data
    returns promise
    */
    async createWaste (data) {

        const reportData = {
            materialName: data.materialName, //STRING
            density: data.density // DOUBLE
          };
        var response = this.firestore.collection('Waste').doc(data.materialName).get()
        .then (async doc =>{
            if (doc.exists){
                return JSON.stringify({msg: "Waste already exists"});
            } else {
                await this.firestore.collection('Waste').doc(data.materialName).set(reportData); 
                return JSON.stringify({msg: 'Waste was added to the database'});
            }
        })
        return response;
    }
}

/*
This function deletes small batches of documents in the database.
It gets called by deleteCollection.
params db, query, resolve
returns promise
*/
async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
    });
}
module.exports = new FirestoreClient();
