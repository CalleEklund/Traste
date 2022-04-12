import React, {useState, useEffect} from 'react';
import {
  Typography,
  Stack,
  Container,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import Inputfield from '../components/Inputfield';
import Selection from '../components/Selection';
import {Colors} from '../assets/Colors';
import SendIcon from '@mui/icons-material/Send';

import PropTypes from 'prop-types';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {useNavigate} from 'react-router-dom';

// Own files
import trasteApi from '../api/trasteApi';
import {binsizes, wasteTypes, sites} from '../assets/Constants';
import WasteInputField from '../components/WasteInputField';
import CameraButtons from '../components/CameraButtons';
import CustomizedDialogs from '../components/confirmation';

/**
 * ReportPage renders the report form for a waste report.
 * @param {*} snackBarHandler Shows a snackbar pop up on report send.
 * @return {form} Returns the form that renders the report page.
 */
function ReportPage({snackBarHandler}) {
  const navigate = useNavigate();

  const [docketCheck, setDocketCheck] = useState(0);
  const [wasteCheck, setWasteCheck] = useState(0);

  const [total, setTotal] = useState(0);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClosed = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: {isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      date: new Date().toDateString(),
      docketNumber: '',
      docketPicture: 'NULL',
      wastePicture: 'NULL',
      name: 'NULL',
      weight: '',
      binSize: '',
      site: '',
      wasteData: {...wasteTypes},
      timeStamps: 'NULL',
    },
  });
  const all = watch(control);

  useEffect(() => {
    console.log(all);
    let tmp = 0;
    Object.values(all.wasteData).forEach((item) => {
      if (!isNaN(parseInt(item))) {
        tmp += parseInt(item, 10);
      }
    });
    setTotal(tmp);
  }, [all]);


  /**
   * uploadPicture will upload an image to firebase storage.
   * @param {Object} picture Picture to be uploaded.
   */
  async function uploadPicture(picture) {
    const res = await trasteApi.post('/uploadimage', {data: picture, headers:
      {'Content-Type': 'multipart/form-data'}}).catch((e) => {
      console.log('error', e);
    });
    return res.data.imgUrl;
  }

  /**
   * sendReport will send the data from the form to the backend.
   * http://localhost:5001/traste-71a71/europe-west3/app/uploadimage
   * https://europe-west3-traste-71a71.cloudfunctions.net/app/createreport
   * @param {*} data All data from the form.
   * @return {Object} The response message from traste API.
   */
  async function sendReport(data) {
    console.log('the data being sent before', data);
    const outData = {...data};

    // Upload pictures to Firebase Storage.
    outData.docketPicture = uploadPicture(data.docketPicture);
    outData.wastePicture = uploadPicture(data.wastePicture);

    // Create new report and return response.
    return await trasteApi.post('/createreport', {data: data});
  }

  // fungerar inte för t.ex. 10e+12
  const onlyNumbers = (score) => !isNaN(parseInt(score)) && isFinite(score);

  const onSubmit = (data) => {
    data = {
      ...data,
      timeStamps: new Date().toUTCString(),
      date: new Date(data.date).toDateString(),
    };

    handleClosed();

    sendReport(data).then((res) => {
      if (res.status === 200) {
        if (res.body.msg === 'Report was made') {
          snackBarHandler(
              'Report was sent!',
              'success',
              {
                width: '100%',
                backgroundColor: Colors.trasteGreen,
                color: '#103849',
                fontSize: 18,
              },
          );
        } else { // When res.body.msg === 'Report already exists'.
          snackBarHandler(
              'An report with that docketnumber already exists!',
              'warning',
          );
        }
      }
    }).catch( (error) => {
      snackBarHandler('An Error occured, report was not sent',
          'error');
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <CustomizedDialogs
          closeHandler={handleClosed}
          open={open}
        />
      </Stack>
    </form>
  );
}

ReportPage.propTypes = {
  snackBarHandler: PropTypes.any.isRequired,
};

export default ReportPage;
