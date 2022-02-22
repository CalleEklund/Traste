import React from "react";
import { TextField } from "@mui/material";

function Inputfield(props) {
  var inputid = "input-" + props.label;
  return (
    <TextField
      
      id={inputid}
      name={props.name}
      label={props.label}
      variant="outlined"
      type={props.type}
      sx={{
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "90vw",
      }}
      onChange={props.handleFactChange}
      inputProps={{"data-testid":"inputfield"}}
    />
  );
}
export default Inputfield;
