import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Stack,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Selection from "../components/Selection";
import Inputfield from "../components/Inputfield";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MaterialField from "../components/MaterialField";
import SendIcon from "@mui/icons-material/Send";

import { Colors } from "../assets/Colors";

import axios from "axios";

/*FactPage renders the report form for a waste report*/

const factData = {
  Date: new Date(),
  DocketNo: 0,
  Weight: 0,
  BinSize: 0,
  Site: "",
};

const wasteData = { Wood: 0, Plastic: 0, Concrete: 0, Metal: 0, Other: 0 };

const binsizes = [
  {
    id: "0",
    label: "5",
  },
  {
    id: "1",
    label: "10",
  },
  {
    id: "2",
    label: "15",
  },
  {
    id: "3",
    label: "20",
  },
];

const sites = [
  {
    id: "0",
    label: "Linköping",
  },
  {
    id: "1",
    label: "Norrköping",
  },
  {
    id: "2",
    label: "Gustavsberg",
  },
  {
    id: "3",
    label: "Vetlanda",
  },
];

function FactPage(props) {
  let navigate = useNavigate();

  const [fact, setFact] = useState(factData);
  const [estimate, setEstimate] = useState(wasteData);
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formDisable, setFormDisable] = useState(true);

  function handleFactChange(evt) {
    if (evt.target === undefined) {
      setFact({ ...fact, Date: evt });
    } else {
      const value = evt.target.value;
      setFact({
        ...fact,
        [evt.target.name]: value,
      });
    }
  }

  function handleEstimateChange(evt) {
    var value = evt.target.value;
    if (value === "") {
      value = 0;
    }

    setEstimate({
      ...estimate,
      [evt.target.name]: value,
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Submitted data:", fact, estimate);
    getDataAxios();
    //props.snackBarHandler()
    //navigate('/')
  };

  async function getDataAxios() {
    const response = await axios.post('http://localhost:3001/createsite', {
       adress: "lin2",
       name: "namn" 
    })
    .then(function (response) {
      console.log(response);
    })
  }

  useEffect(() => {
    /** Calculates the total sum of each waste percentage, is called everytime a wastetype value is changed */
    var sum = 0;
    Object.values(estimate).forEach((x) => (sum += parseInt(x)));
    if (isNaN(sum)) {
      sum = 0;
    }
    setTotalEstimate(sum);
  }, [estimate]);

  function renderWasteList() {
    var outputlist = [];
    for (let i = 0; i < Object.keys(wasteData).length; i += 2) {
      if (i + 1 >= Object.keys(wasteData).length) {
        outputlist.push(
          <Stack direction="row" key={i + "stack"}>
            <MaterialField
              name={Object.keys(wasteData)[i]}
              estimateChange={handleEstimateChange}
              key={i}
            />
          </Stack>
        );
      } else {
        outputlist.push(
          <Stack direction="row" spacing={2} key={i + "stack"}>
            <MaterialField
              name={Object.keys(wasteData)[i]}
              estimateChange={handleEstimateChange}
              key={i}
            />
            <MaterialField
              name={Object.keys(wasteData)[i + 1]}
              estimateChange={handleEstimateChange}
              key={i + 1}
            />
          </Stack>
        );
      }
    }

    return (
      <Stack direction="column" spacing={2} sx={{ width: "90vw" }}>
        {outputlist}
      </Stack>
    );
  }

  function isReportDisabled() {
    return totalEstimate !== 100 && fact !== factData;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        minWidth: "100%",
        height: "100vh",
        margin: "0",
        padding: "0",
        display: "flex",
      }}
    >
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        disableGutters={true}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            name="Date"
            value={date}
            autoOK
            minDate={new Date("2000-01-01T03:00:00")}
            onChange={setDate}
            onAccept={handleFactChange}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  marginTop: "15px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  width: "90vw",
                }}
                onChange={handleFactChange}
              />
            )}
          />
        </LocalizationProvider>
        <Inputfield
          label="Docket No."
          name="DocketNo"
          type="string"
          handleFactChange={handleFactChange}
        />
        <Inputfield
          label="Weight"
          name="Weight"
          type="number"
          handleFactChange={handleFactChange}
        />
        <Selection
          title="Bin Size"
          name="BinSize"
          data={binsizes}
          handleFactChange={handleFactChange}
        />
        <Selection
          title="Sites"
          name="Site"
          data={sites}
          handleFactChange={handleFactChange}
        />

        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginTop: "15px" }}
        >
          Waste Types
        </Typography>
        {renderWasteList()}
        <Stack
          direction="column"
          justifyContent="center"
          alignContent="stretch"
          sx={{ marginTop: "15px", width: "100vw", flexGrow: "2" }}
        >
          <Stack
            sx={{
              flex: "1",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: Colors.trasteNavyBlue,
              color: "white",
            }}
            direction="row"
          >
            <Typography variant="h3">Total: </Typography>

            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={totalEstimate > 100 ? 100 : totalEstimate}
                size={60}
                thickness={5}
                sx={{ color: totalEstimate > 100 ? "red" : Colors.trasteGreen }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={16}
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  {`${Math.round(totalEstimate)}%`}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Button
            endIcon={
              <SendIcon
                sx={{ color: Colors.trasteNavyBlue, fontSize: "200px" }}
              />
            }
            disabled={totalEstimate !== 100}
            type="submit"
            sx={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              aligntContent: "stretch",
              justifyContent: "space-around",
              backgroundColor:
                totalEstimate === 100
                  ? Colors.trastePurple
                  : Colors.trasteDadada,
              borderRadius: "0",
            }}
          >
            <Typography variant="h5" sx={{ color: Colors.trasteNavyBlue }}>
              Send Report
            </Typography>
          </Button>
        </Stack>
      </Container>
    </form>
  );
}
export default FactPage;
