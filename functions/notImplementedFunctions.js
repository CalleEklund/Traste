
/*
This is the function for posting on localhost/3000/createsite.
This is for testing the createsite function.
*/
app.post("/createsite", validate({body: siteSchema}), (req, res) => {
  const data = req.body;
  console.log("HEJ");

  let response = FS.createSite(data);
  console.log(response);
  response = response.then(function(msg) {
    res.header("Access-Control-Allow-Origin", "*" );
    res.send(msg);
  }).catch((err) => {
    res.header("Access-Control-Allow-Origin", "*" );
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
  This is the function for posting on localhost/3000/createwaste.
  This is for testing the createwaste function.
  */
app.post("/createwaste", validate({body: wasteSchema}), (req, res) => {
  const data = req.body;
  let response = FS.createWaste(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
  This is the function for posting on localhost/3000/createfacility
  This is for testing.
  */
app.post("/createfacility", validate({body: facilitySchema}), (req, res) => {
  const data = req.body;
  let response = FS.createFacility(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

/*
  This is the function for posting on localhost/3000/createemployee
  This is for testing.
  */
app.post("/createemployee", validate({body: employeeSchema}), (req, res) => {
  const data = req.body;
  let response = FS.createEmployee(data);
  console.log(response);
  response = response.then(function(msg) {
    res.send(msg);
  }).catch((err) => {
    res.send(JSON.stringify({"error": err.message}));
  });
});

