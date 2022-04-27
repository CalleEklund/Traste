
/**
 *This file contains the tests for index.js
 */

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

const {app} = require("../../index.js");
chai.use(chaiHttp);

const data = {
  Concrete: "0",
  Metal: "0",
  Other: "0",
  Plastic: "0",
  Wood: "100",
  binSize: 15,
  date: "Fri Mar 04 2022",
  docketNumber: "testinput",
  docketPicture: "https://Andreas.se",
  name: "NULL",
  site: "Norrköping",
  timeStamps: "NULL",
  wasteData: {"Wood": 0, "Plastic": 0, "Concrete": 0, "Metal": 0, "Other": 0},
  wastePicture: "http://google.rasmus",
  weight: 100,
};
const data2 = {
  Concrete: "0",
  Metal: "0",
  Other: "0",
  Plastic: "0",
  Wood: "100",
  binSize: 15,
  date: "Fri Mar 04 2022",
  docketNumber: "linus.se",
  docketPicture: "https://erik.com",
  name: "NULL",
  site: "Norrköping",
  timeStamps: "NULL",
  wasteData: {"Wood": 0, "Plastic": 0, "Concrete": 0, "Metal": 0, "Other": 0},
  wastePicture: "https://rasmuscalle.com",
  weight: "100",
};
const data3 = {
  Concrete: "0",
  Metal: "0",
  Other: "0",
  Plastic: "0",
  Wood: "100",
  binSize: 15,
  date: "Fri Mar 04 2022",
  docketNumber: "testinput",
  docketPicture: "/Andreas.se",
  name: "NULL",
  site: "Norrköping",
  timeStamps: "NULL",
  wasteData: {"Wood": 0, "Plastic": 0, "Concrete": 0, "Metal": 0, "Other": 0},
  wastePicture: "http://google.rasmus",
  weight: 100,
};

// lägg till after för att ta rapporten
describe("Integration Test for post function create report ", () => {
  it("Should return that a report was made with status code 200", (done) => {
    chai
        .request(app)
        .post("/createreport")
        .send(data).end(function(error, response, body) {
          if (error) {
            done(error);
          } else {
            assert.equal(response.text,
                JSON.stringify({msg: "Report was made"}));
            assert.equal(response.status, 200);
            done();
          }
        });
  });

  it("Should return that a report allready exists with status code 200",
      (done) => {
        chai
            .request(app)
            .post("/createreport")
            .send(data).end(function(error, response, body) {
              if (error) {
                done(error);
              } else {
                assert.equal(response.text,
                    JSON.stringify({msg: "Report already exists"}));
                assert.equal(response.status, 200);
                done();
              }
            });
      });
  it("Should return that a report was deleted with status code 200",
      (done)=>{
        chai
            .request(app)
            .post("/deletereport")
            .send(data)
            .end(function(error, response, body) {
              if (error) {
                done(error);
              } else {
                assert.equal(response.text,
                    JSON.stringify({msg: "Delete was successfull"}));
                assert.equal(response.status, 200);
                done();
              }
            });
      });
  it("Should return status code 400, for wrong data type", (done) => {
    chai
        .request(app)
        .post("/createreport")
        .send(data2).end(function(error, response, body) {
          if (error) {
            done(error);
          } else {
            assert.equal(response.body.errors.body[0].message,
                "should be integer");
            done();
          }
        });
  });

  it("Should return status code 400, for wrong image format", (done) => {
    chai
        .request(app)
        .post("/createreport")
        .send(data3).end(function(error, response, body) {
          if (error) {
            done(error);
          } else {
            assert.equal(response.statusCode, 400);
            assert.equal(response.text,
                JSON.stringify({"error": "Invalid url"}));
            done();
          }
        });
  });
});


