import React from "react";
import { Container, TextField, Box } from "@mui/material";
import Selection from "../components/Selection";
import Inputfield from "../components/Inputfield";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

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

function FactPage() {
  const [value, setValue] = React.useState(new Date());

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <MobileDatePicker
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} sx={{marginTop:'15px', backgroundColor: "rgba(255,255,255,0.3)"}}/>}
            
          />
        </LocalizationProvider>
      <Inputfield label="Docket No." type="string" />
      <Inputfield label="Weight" type="number" />
      <Selection title="Bin Size" data={binsizes} />
      <Selection title="Sites" data={sites} />
    </Container>
  );
}
export default FactPage;
