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
      onChange={(e) => {
        handleChange(e);
        props.handleFactChange(e);
      }}
      sx={{
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "90vw",
      }}
      //required
      inputProps={{ "data-testid": "selectionfield" }}
    >
      {
        /** Placeholde ifall det inte finns någon data */
        props.data !== undefined ? (
          props.data.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <p>Ingen data</p>
        )
      }
    </TextField>
  );
}
export default Selection;
