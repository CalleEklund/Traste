/*
This is the test file for createReport
*/

const {expect} = require("chai");
const {FirestoreClient} = require("../../firestoreClient");
const FS = new FirestoreClient();

describe("The create function", () => {
  it("Should return report was made", function(done) {
    const data = {
      "date": "Thu Apr 07 2022",
      "docketNumber": "123a",
      "docketPicture": "http://localhost:9199/v0/b/traste-71a71.appspot.com/o/55efc864-b8f0-4033-840c-abb9885b3591?alt=media&token=5b69b1f4-e365-478b-8b9b-d21777cb9a5a",
      "wastePicture": "http://localhost:9199/v0/b/traste-71a71.appspot.com/o/e2e5a463-cecd-4136-a722-62e51568191c?alt=media&token=9b4ae298-9a10-4cbe-be95-ad69cbb501fe",
      "name": "NULL",
      "weight": 100,
      "binSize": 10,
      "site": "Norrköping",
      "wasteData": {
        "Wood": 100,
        "Plastic": 0,
        "Concrete": 0,
        "Metal": 0,
        "Other": 0,
      },
      "timeStamps": "Thu, 07 Apr 2022 14:41:44 GMT",
    };

    FS.createReport(data).then((res, body) => {
      expect(res).to.be.eq(JSON.stringify({msg: "Report was made"}));
      done();
    }).catch(done);
  });
  it("Should return report already exists", function(done) {
    const data = {
      "docketNumber": "f",
      "docketPicture": "Andreas",
      "wastePicture": "andreas",
      "name": "Andreas",
      "weight": 10,
      "timeStamps": "erik",
      "binSize": 5,
      "facility": "Andreas",
      "wasteData": {"wood": 0, "concrete": 100, "other": 0, "metal": 0},
    };

    FS.createReport(data).then((res, body) => {
      expect(res).to.be.eq(JSON.stringify({msg: "Report already exists"}));
      done();
    }).catch(done);
  });

  it("Should return a error", function(done) {
    const data = {
      "docketPicture": "Andreas",
      "wastePicture": "andreas",
      "name": "Andreas",
      "weight": 10,
      "timeStamps": "erik",
      "binSize": 5,
      "facility": "Andreas",
      "wasteData": {"wood": 0, "concrete": 100, "other": 0, "metal": 0},
    };

    FS.createReport(data).then((res, body) => {
      done();
    }).catch((err) => {
      expect(JSON.stringify({"error": err.message})).to.be.eq(JSON.stringify(
          {"error": "Value for argument \"documentPath\" " + "\n" +
          " is not a valid resource path. Path must be a non-empty string."}));
      done();
    });
  });
});
