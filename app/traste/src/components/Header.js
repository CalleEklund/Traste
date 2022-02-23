import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../assets/traste_logo.png";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Colors} from "../assets/Colors"


function Header(props) {
  return (
    <Box data-testid="header">
      <AppBar
        position="static"
        sx={{ textAlign: "center", backgroundColor: Colors.trasteNavyBlue }}
      >
        <Toolbar>
          <KeyboardBackspaceIcon fontSize="large" onClick={props.goBackHandler} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TRASTE
          </Typography>
          <img src={logo} alt="traste logo" style={{ height: "40px" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
