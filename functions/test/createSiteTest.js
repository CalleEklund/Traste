/*
This is the test file for createSite
*/

const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('The create site function', () => {  
    
    
    it('Should return site was made',  function(done) {
        
        var data = {
            "adress": "Glava återvinningscentral",
            "name": "EPIC RECYCLING CENTER"
       }     
        
        FirestoreClient.createSite(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Site was made'}));
            done();
        }).catch(done);
        
    })
    it('Should return site already exists', function(done){
        var data = {
            "adress": "Glava återvinningscentral",
            "name": "EPIC RECYCLING CENTER"
       }     
        
        FirestoreClient.createSite(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Site already exists'}));
            done();
        }).catch(done);
    })

    it('Should return a error', function(done){
        var data = {
            "adress": "Glava återvinningscentral",
            "name": "EPIC RECYCLING CENTER"
       }     
        
        FirestoreClient.createSite(data).then((res, body) => {
            done();
        }).catch(err => {
            expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify(
                {"error": "Value for argument \"documentPath\" is not a valid resource path. Path must be a non-empty string."}));
            done();
        })
    })

    it('Should delete all reports', function(done) {
        FirestoreClient.deleteCollection('Sites', 10).then((res, body) =>{
            done();
        });
    })
})
