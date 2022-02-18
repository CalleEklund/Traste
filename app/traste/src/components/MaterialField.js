import React from "react"

import {
    TextField,
    InputAdornment,
  } from "@mui/material";

function MaterialField (props){
    var inputid = "estimate-"+props.name
    return (
        <TextField
          id={inputid}
          name={props.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" disableTypography={true}>%</InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">{props.name}</InputAdornment>,
          }}
          variant="outlined"
          type="number"
          onFocus={event => {event.target.select()}}
          onChange={props.estimateChange}
          sx={{backgroundColor: "rgba(255,255,255,0.3)",direction:'rtl',width:'fit-content'}}
        />
    );
}export default MaterialField