/*
This is the test file for createWaste
*/

const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('The createWaste function', () => {  
    
    
    it('Should return waste was made',  function(done) {
        
        var data = {
            "materialName": "Copper",
            "density": 0.6
       }     
        
        FirestoreClient.createWaste(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Waste was added to the database'}));
            done();
        }).catch(done);
        
    })
    it('Should return waste already exists', function(done){
        var data = {
            "materialName": "Copper",
            "density": 0.6
       }     
        
        FirestoreClient.createWaste(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Waste already exists'}));
            done();
        }).catch(done);
    })

    it('Should return a error', function(done){
        var data = {
            "materialName": "Copper",
            "density": 0.6
       }
        
        FirestoreClient.createWaste(data).then((res, body) => {
            done();
        }).catch(err => {
            expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify({"error": "Value for argument \"documentPath\" is not a valid resource path. Path must be a non-empty string."}));
            done();
        })
    })

    it('Should delete all waste documents', function(done) {
        FirestoreClient.deleteCollection('Waste', 10).then((res, body) =>{
            done();
        });
    })
})