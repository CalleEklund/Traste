/*
This is the test file for createEmployee
*/

const { expect } = require('chai');
const FirestoreClient = require("../firestoreClient");

describe('The create function', () => {  
    
    
    it('Should return Employee was made',  function(done) {
        
        var data = {
            "employeeId": "fsdkjfn4574", 
            "name": "Andreas", 
            "email": "andreas.email.com", 
            "password": "MINKATT", 
            "isDeleted": true, 
            "facilityId": "fdksnf348347" 
        }
        
        FirestoreClient.createEmployee(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Employee was added to the database'}));
            done();
        }).catch(done);
        
    })
    it('Should return Employee already exists', function(done){
        var data = {
            "employeeId": "fsdkjfn4574", 
            "name": "Andreas", 
            "email": "andreas.email.com", 
            "password": "MINKATT", 
            "isDeleted": true, 
            "facilityId": "fdksnf348347" 
            
        }
        
        FirestoreClient.createEmployee(data).then((res, body) => {
            expect(res).to.be.eq(JSON.stringify({msg: 'Employee already exists'}));
            done();
        }).catch(done);
    })

    it('Should return a error', function(done){
        var data = {
            "name": "Andreas", 
            "email": "andreas.email.com", 
            "password": "MINKATT", 
            "isDeleted": true, 
            "facilityId": "fdksnf348347" 
            
        }
        
        FirestoreClient.createEmployee(data).then((res, body) => {
            done();
        }).catch(err => {
            expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify(
                {"error": "Value for argument \"documentPath\" is not a valid resource path. Path must be a non-empty string."}));
            done();
        })
    })

    it('Should delete all reports', function(done) {
        FirestoreClient.deleteCollection('Employees', 10).then((res, body) =>{
            done();
        });
    })
})
