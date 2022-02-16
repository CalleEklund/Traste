import React from "react";
import { TextField } from "@mui/material";

function Inputfield(props) {
  var inputId = "input" + props.label;
  return (
    <TextField
      id={inputId}
      label={props.label}
      variant="outlined"
      type={props.type}
      sx={{ marginTop: "15px", backgroundColor: "rgba(255,255,255,0.3)" }}
    />
  );
}
export default Inputfield;
