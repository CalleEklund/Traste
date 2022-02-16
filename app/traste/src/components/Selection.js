import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

function Selection(props) {
  const [selectedValue, setSelectedValue] = useState(props.data[0].id);

  var selectionId = "select-" + props.title;
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <TextField
      id={selectionId}
      select
      label={props.title}
      value={selectedValue}
      onChange={handleChange}
      sx={{ marginTop: "15px", backgroundColor: "rgba(255,255,255,0.3)" }}
    >
      {props.data.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
export default Selection;
