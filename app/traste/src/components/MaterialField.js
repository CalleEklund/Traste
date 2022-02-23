import React from "react";

import { TextField, InputAdornment } from "@mui/material";

function MaterialField(props) {
  var inputid = "estimate-" + props.name;
  return (
    <TextField
      id={inputid}
      name={props.name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">{props.name}</InputAdornment>
        ),
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
      onChange={props.estimateChange}
      defaultValue={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "fit-content",
      }}
      inputProps={{
        style: { textAlign: "right" },
        "data-testid":"materialfield"
      }}
    />
  );
}
export default MaterialField;
