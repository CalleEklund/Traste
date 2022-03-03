import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import logo from '../assets/traste_logo.png';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import {Colors} from '../assets/Colors';

/**
 * The main header for the app. Used to navigate the app.
 * @param {goBackHandler} props Contains the handler for navigating back
 * in the document
 * @return {AppBar} with logo and title.
 */
function Header({goBackHandler}) {
  return (
    <AppBar
      data-testid='header'
      position='sticky'
      sx={{textAlign: 'center', backgroundColor: Colors.trasteNavyBlue}}
    >
      <Toolbar>
        <KeyboardBackspaceIcon fontSize='large' onClick={goBackHandler} />
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          TRASTE
        </Typography>
        <img src={logo} alt='traste logo' style={{height: '40px'}} />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  goBackHandler: PropTypes.func.isRequired,
};

export default Header;
