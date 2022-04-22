/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import MenuPage from './screens/MenuPage';
import {Container, Snackbar, Alert} from '@mui/material';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ReportPage from './screens/ReportPage';
import Header from './components/Header';

import {Colors} from './assets/Colors';

import axios from 'axios';
import HistoryPage from './screens/HistoryPage';
import LoginPage from './screens/LoginPage';

/**
 * Main file for controling the flow of the app.
 * @return {Container} with paths to the different screens.
 */
function App() {
  const outData = new FormData();

  const history = useNavigate();
  const [open, setOpen] = useState();
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [sx, setSx] = useState({});

  const [dockerImage, setDockerImage] = useState();
  // const [wasteImage, setWasteImage] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const openSnackBar = (message, severity, sx) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);

    if (sx !== undefined) { // Not required to input sx.
      setSx(sx);
    }
  };

  /**
   * Function to return to the previous page via routing.
   */
  function goBack() {
    history(-1);
  }


  return (

    <Container
      disableGutters={true}
      sx={{height: '100vh', display: 'flex', flexDirection: 'column',
        bgcolor: Colors.trasteGreen}}
    >
      <Header goBackHandler={goBack} />

      <Snackbar
        open={open}
        onClose={handleClose}
        key={1}
        autoHideDuration={6000}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        sx={{marginTop: '7vh'}}>

        <Alert
          severity={severity}
          sx={sx}>
          {message}
        </Alert>
      </Snackbar>

      <Routes>
        <Route
          exact path="/menupage"
          element={<MenuPage />}
        />
        <Route
          path="/reportpage"
          element={<ReportPage snackBarHandler={openSnackBar} />}
        />
        <Route
          path="/historypage"
          element={<HistoryPage/>}
        />
        <Route
          path="/"
          element={<LoginPage snackBarHandler={openSnackBar}/>}
        />
      </Routes>
    </Container>
  );
}

export default App;
