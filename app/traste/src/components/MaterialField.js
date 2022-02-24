import React, { useState } from "react";

import { TextField, InputAdornment } from "@mui/material";

function MaterialField(props) {
  const [curr, setCurr] = useState(0);
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
      onChange={(e) => {
        //checks so that the new input is a number
        if (/^\d+$/.test(e.target.value) || e.target.value.length === 0) {
          setCurr(e.target.value);
          props.estimateChange(e);
        }
      }}
      value={curr}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)",
        width: "fit-content",
      }}
      inputProps={{
        style: { textAlign: "right" },
        "data-testid": "materialfield",
      }}
    />
  );
}
export default MaterialField;
