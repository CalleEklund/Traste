import React from "react";
import { TextField, MenuItem } from "@mui/material";

function Selection({ label, value, onChange, error, data }) {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      sx={{
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "90vw",
      }}
      //required
      inputProps={{ "data-testid": "selectionfield" }}
      error={!!error}
      //helperText={error ? error.message : null}
    >
      {
        /** Placeholde ifall det inte finns någon data */
        data !== undefined ? (
          data.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={0}>Ingen data</MenuItem>
        )
      }
    </TextField>
  );
}
export default Selection;
