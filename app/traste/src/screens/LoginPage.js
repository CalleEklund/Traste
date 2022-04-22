import React from 'react';
import {Container, Typography, Button} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {loginAPI} from '../api/trasteApi.js';
import {successSx} from '../assets/Constants';
import PropTypes from 'prop-types';
import {Colors} from '../assets/Colors.js';
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';

/**
 *
 * @return {*} lol
 */
function LoginPage({snackBarHandler}) {
  const salt = '$2a$10$CwTycUXWue0Thq9StjUM0u';
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const loginCallback = () => {
    login();
  };

  /**
   * The login function itself
   */
  async function login() {
    const hashedPassword = bcrypt.hashSync(values.password, salt);
    const res = await loginAPI
        .post('', hashedPassword).catch((e) => {
          snackBarHandler(
              'An error occurred, please try again later (never).',
              'error',
          );
        });

    if (res.status === 400) {
      snackBarHandler(
          'The password is not correct, ' +
          'please check that you have the correct password.',
          'warning',
      );
    } else if (res.status === 200) {
      snackBarHandler(
          'Successfully logged in.',
          'success', successSx,
      ); // dubbelkolla path till token från res.
      localStorage.setItem('token', res.payload.data.token);
      navigate('/menupage');
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      sx={{flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', width: '100vw'}}
    >
      <Typography variant="h7">Enter password to access Traste: </Typography>

      <FormControl sx={{m: 1, width: '80vw', marginTop: '2vh',
        marginBottom: '2vh'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button variant="contained"
        onClick={loginCallback}
        sx={{width: '80vw', backgroundColor: Colors.trasteNavyBlue}}
      >Log in
      </Button>

    </Container>
  );
};

LoginPage.propTypes = {
  snackBarHandler: PropTypes.any.isRequired,
};

export default LoginPage;
