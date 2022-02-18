import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

function Selection(props) {
  const [selectedValue, setSelectedValue] = useState("");

  var selectionId = "select-" + props.title;
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <TextField
      id={selectionId}
      select
      label={props.title}
      name={props.name}
      value={selectedValue}
      onChange={e => {handleChange(e); props.handleFactChange(e)}}
      sx={{ marginTop: "15px", backgroundColor: "rgba(255,255,255,0.3)", width:'90vw' }}
    >
      {props.data.map((option) => (
        <MenuItem key={option.id} value={option.label}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default Selection;
