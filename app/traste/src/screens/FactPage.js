import React from "react";
import { Container, } from "@mui/material";
import Selection from "../components/Selection";
import Inputfield from "../components/Inputfield"
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
  
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Inputfield label="Docket No." type="string"/>
      <Inputfield label="Weight" type="number"/>
      <Selection title="Bin Size" data={binsizes} />
      <Selection title="Sites" data={sites} />
    </Container>
  );
}
export default FactPage;
