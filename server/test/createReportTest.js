const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('the create function', () => {   

    it('Should return report was made',  function(done) {
        
        var data = {
            "docketNumber": "f" , 
            "docketPicture": "Andreas",
            "wastePicture": "andreas", 
            "name": "Andreas", 
            "weight": 10, 
            "timeStamps": "erik", 
            "binSize": 5, 
            "facility": "Andreas"
        }
        
        FirestoreClient.createReport(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Report was made'}));
            done();
        }).catch(done);
        
    })
})