const Firestore = require('@google-cloud/firestore');
const path = require('path');

class FirestoreClient {
    constructor() {
        this.firestore = new Firestore({
            projectId: "traste-71a71",
            keyFilename: path.join(__dirname, './service_account.json')
        })
    }
    async createReport (_docketNumber, _docketPicture , _wastePicture, _name, _weight, _timeStamps, _binSize, _facility) {

        const reportData = {
            docketNumber: _docketNumber,
            docketPicture: _docketPicture,
            wastePicture: _wastePicture,
            name: _name,
            weight: _weight,
            timestamps: _timeStamps,
            binSize: _binSize,
            facility: _facility
          };
          
        
          const res = await this.firestore.collection('Reports').doc(_docketNumber).set(reportData);
          
    
    }
}

module.exports = new FirestoreClient();