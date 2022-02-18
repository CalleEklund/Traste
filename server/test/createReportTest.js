/*
This is the test file for createReport
*/

const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('The create function', () => {  
    
    
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
    it('Should return report already exists', function(done){
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
            expect(res).to.be.eq(JSON.stringify({msg: 'Report already exists'}));
            done();
        }).catch(done);
    })

    it('Should return a error', function(done){
        var data = {
            "docketPicture": "Andreas",
            "wastePicture": "andreas", 
            "name": "Andreas", 
            "weight": 10, 
            "timeStamps": "erik", 
            "binSize": 5, 
            "facility": "Andreas"
        }
        
        FirestoreClient.createReport(data).then((res, body) => {
            done();
        }).catch(err => {
            expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify({"error": "Value for argument \"documentPath\" is not a valid resource path. Path must be a non-empty string."}));
            done();
        })
    })

    it('Should delete all reports', function(done) {
        FirestoreClient.deleteCollection('Reports', 10).then((res, body) =>{
            done();
        });
    })
})