import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../assets/traste_logo.png";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Header() {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ textAlign: "center", backgroundColor: "#103849" }}
      >
        <Toolbar>
          <KeyboardBackspaceIcon fontSize="large"/>

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
