
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
  docketNumber: "Andreas.se",
  docketPicture: "https://Andreas.se",
  name: "NULL",
  site: "Norrköping",
  timeStamps: "NULL",
  wasteData: {"Wood": 0, "Plastic": 0, "Concrete": 0, "Metal": 0, "Other": 0},
  wastePicture: "http://google.com",
  weight: 100,
};
const data2 = {
  "Concrete": "0",
  "Metal": "0",
  "Other": "0",
  "Plastic": "0",
  "Wood": "100",
  "binSize": 15,
  "date": "Fri Mar 04 2022",
  "docketNumber": "Andreas.se",
  "docketPicture": "https://Andreas.se",
  "name": "NULL",
  "site": "Norrköping",
  "timeStamps": "NULL",
  "wasteData": {"Wood": 0, "Plastic": 0, "Concrete": 0, "Metal": 0, "Other": 0},
  "wastePicture": "http://google.com",
  "weight": "100",
};

describe("Integration Test for post function create report ", () => {
  /* it("Test endpoint", ()=>{
    chai.request(app).get("/test").end((err, res)=>{
      assert.equal(res.statusCode, 200);
    });
  });*/
  it("simple post", (done)=>{
    chai.request(app).post("/simple") .send({"myparam": "test"})
        .end(function(error, response, body) {
          console.log(body);
          if (error) {
            done(error);
          } else {
            done();
          }
        });
  });

  /*
  it("Should return status code 200", (done) => {
    chai
        .request(app)
        .post("/createreport")
        .send({
          Concrete: "0",
          Metal: "0",
          Other: "0",
          Plastic: "0",
          Wood: "100",
          binSize: 15,
          date: "Fri Mar 04 2022",
          docketNumber: "Andreas.se",
          docketPicture: "https://Andreas.se",
          name: "NULL",
          site: "Norrköping",
          timeStamps: "NULL",
          wasteData: {"Wood": 0, "Plastic": 0, "Concrete": 0,
            "Metal": 0, "Other": 0},
          wastePicture: "http://google.com",
          weight: 100,
        }) .end(function(error, response, body) {
          if (error) {
            done(error);
          } else {
            done();
          }
        });
    console.log("resbody", res.body);
    assert.equal(res.statusCode, 200);
  });*/
  /*  it("Should return status code 400, for wrong data type", async () => {
    const res = await chai
        .request(app)
        .post("/createreport")
        .send(data2);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body, {"error": "Invalid url"});
  }); */
});

/* assert.isNotNull(res.body.number);
assert.isNumber(res.body.number);
assert.isAtLeast(res.body.number, 0);
assert.isAtMost(res.body.number, 100); */


