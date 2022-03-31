/* eslint-disable react/prop-types */
import React from "react";

import { TextField, InputAdornment } from "@mui/material";

function MaterialField({ label, value, onChange, error }) {
  return (
    <TextField
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" disableTypography={true}>
            %
          </InputAdornment>
        ),
      }}
      variant="outlined"
      type="number"
      onFocus={(event) => {
        event.target.select();
      }}
      onBlur={(evt) => {
        if (evt.target.value === "" || evt.target.value < 0) {
          onChange(0);
        }
      }}
      value={value}
      onChange={(e) => {
        var tmpval = e.target.value;
        if (isNaN(parseInt(e.target.value, 10))) {
          tmpval = "";
        } else {
          tmpval = parseInt(tmpval, 10);
        }
        onChange(tmpval);
      }}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)",
      }}
      inputProps={{
        style: { textAlign: "right", fontSize: 16 },
        "data-testid": "materialfield",
      }}
      error={!!error}
      //helperText={error ? error.message : null}
    />
  );
}
export default MaterialField;
