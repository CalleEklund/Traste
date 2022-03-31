/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@mui/material";

function Inputfield({ label, value, onChange, error, type }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      sx={{
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "90vw",
      }}
      value={value}
      type={type}
      onChange={onChange}
      inputProps={{ "data-testid": "inputfield" }}
      error={!!error}
      //helperText={error ? error.message : null}
    />
  );
}
export default Inputfield;
