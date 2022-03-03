/*
This is the test file for createFacility
*/

const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('The create function', () => {  
    
    
    it('Should return Facility was made',  function(done) {
        
        var data = {
            "facilityId": "a320vbn4",
            "location": "kungsgatan 12"
        }
        
        FirestoreClient.createFacility(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Facility was added to the database'}));
            done();
        }).catch(done);
        
    })
    it('Should return Facility already exists', function(done){
        var data = {
            "facilityId": "a320vbn4",
            "location": "kungsgatan 16"
        }
        
        FirestoreClient.createFacility(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Facility already exists'}));
            done();
        }).catch(done);
    })

    it('Should return an error', function(done){
        var data = {
            "location": "kungsgatan 12"
        }
        
        FirestoreClient.createFacility(data).then((res, body) => {
            done();
        }).catch(err => {
            expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify(
                {"error": "Value for argument \"documentPath\" is not a valid resource path. Path must be a non-empty string."}));
            done();
        })
    })

    it('Should delete all reports', function(done) {
        FirestoreClient.deleteCollection('Facilities', 10).then((res, body) =>{
            done();
        });
    })
})
