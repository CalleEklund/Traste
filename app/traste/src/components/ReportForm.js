import React, {useState} from 'react';
import {
  Typography,
  Stack,
  Container,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {Controller} from 'react-hook-form';
import Inputfield from './Inputfield';
import Selection from './Selection';
import {Colors} from '../assets/Colors';
import SendIcon from '@mui/icons-material/Send';

import PropTypes from 'prop-types';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Own files
import {binsizes, sites} from '../assets/Constants';
import WasteInputField from './WasteInputField';
import CameraButtons from './CameraButtons';

/**
 * ReportForm renders the report form for a waste report.
 * @param {func}  handleSubmit a snackbar pop up on report send.
 * @param {func}  onSubmit a snackbar pop up on report send.
 * @param {bool}  isValid a snackbar pop up on report send.
 * @param {bool}  onlyNumbers a snackbar pop up on report send.
 * @param {func}  handleClickOpen a snackbar pop up on report send.
 * @return {form} Returns the form that renders the report page.
 */
function ReportForm({handleSubmit, onSubmit, control, total, isValid,
  onlyNumbers, handleClickOpen}) {
  const [docketCheck, setDocketCheck] = useState(0);
  const [wasteCheck, setWasteCheck] = useState(0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      id='report-form'>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>

        <Controller
          name="date"
          control={control}
          rules={{required: 'Select a valid date'}}
          render={({field: {onChange, value}}) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date"
                name="Date"
                value={value}
                autoOK
                minDate={new Date('2000-01-01T03:00:00')}
                maxDate={new Date()}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      marginTop: '15px',
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      width: '90vw',
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />

        <Stack
          style={{display: 'flex'}}
          width='90vw'
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'flex-start',
          }}>

          <Controller
            name="docketNumber"
            control={control}
            rules={{required: 'Docket Number required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Inputfield
                label="Docket No."
                onChange={onChange}
                value={value}
                error={error}
                sx={{width: '85vw',
                  marginTop: '15px',
                  backgroundColor: 'rgba(255,255,255,0.3)'}}
              />
            )}
          />

          <CameraButtons
            control={control}
            useStateValue={docketCheck}
            setUseStateFunc={setDocketCheck}
            buttonId={'contained-button-file'}
            name={'docketPicture'}
            iconId={'icon-button-file'}
          />
        </Stack>

        <Controller
          name="weight"
          control={control}
          rules={{
            required: 'Enter a valid number',
            validate: onlyNumbers,
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <Inputfield
              label="Weight"
              onChange={(e) => {
                let tmpval = e.target.value;
                if (isNaN(parseInt(e.target.value, 10))) {
                  tmpval = 0;
                } else {
                  tmpval = parseInt(tmpval, 10);
                }
                onChange(tmpval);
              }}
              value={value}
              error={error}
              type="number"
            />
          )}
        />

        <Controller
          name="binSize"
          control={control}
          rules={{required: 'Select a bin size'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <Selection
              label="Bin Size"
              data={binsizes}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
        />

        <Controller
          name="site"
          control={control}
          rules={{required: 'Select a site'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <Selection
              label="Site"
              data={sites}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
        />

        <Stack
          style={{display: 'flex'}}
          width='90vw'
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Typography
            variant="h4"
            sx={{textAlign: 'center', marginTop: '10px', marginBottom: '10px'}}>
            Waste Types
          </Typography>

          <CameraButtons
            control={control}
            useStateValue={wasteCheck}
            setUseStateFunc={setWasteCheck}
            buttonId={'waste-button-file'}
            name={'wastePicture'}
            iconId={'waste-icon-button-file'}
          />
        </Stack>

        <WasteInputField control={control} onlyNumbers={onlyNumbers} />
      </Container>

      <Stack
        direction="column"
        justifyContent="center"
        alignContent="stretch"
        sx={{
          marginTop: '15px',
          width: '100vw',
          flexGrow: '2',
          position: 'sticky',
          justifyContent: 'space-around',
          bottom: 0,
          display: 'flex',
          zIndex: 2,
          flex: '1',
        }}>

        <Stack
          sx={{
            flex: '1',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: Colors.trasteNavyBlue,
            color: 'white',
            paddingTop: 1,
            paddingBottom: 1,
          }}
          direction="row">

          <Typography variant="h4">Waste total: </Typography>

          <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress
              variant="determinate"
              value={total > 100 ? 100 : total}
              size={60}
              thickness={5}
              sx={{color: total > 100 ? 'red' : Colors.trasteGreen}}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={16}
                fontWeight="bold"
                sx={{color: 'white'}}>
                {`${Math.round(total)}%`}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Button
          endIcon={
            <SendIcon
              sx={{
                color: Colors.trasteNavyBlue,
                fontSize: '200px',
                width: 40,
                height: 40,
              }}
            />
          }
          disabled={total !== 100}
          // type="submit"
          sx={{
            flex: '1',
            display: 'flex',
            position: 'sticky',
            alignItems: 'center',
            aligntContent: 'stretch',
            justifyContent: 'space-around',
            width: 1,
            zIndex: 2,
            backgroundColor:
            isValid && total === 100 ?
              Colors.trastePurple :
              Colors.trasteDadada,
            borderRadius: '0',
            paddingTop: 1,
            paddingBottom: 1,
          }}
          onClick={handleClickOpen}
        >

          <Typography
            variant="h4"
            sx={{color: Colors.trasteNavyBlue}}>
            Send Report
          </Typography>
        </Button>
      </Stack>
    </form>
  );
}

ReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  onlyNumbers: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

export default ReportForm;
