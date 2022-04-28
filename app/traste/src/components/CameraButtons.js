import React from 'react';
import {Controller} from 'react-hook-form';
import {Button, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {Colors} from '../assets/Colors';

/**
 * Custom Stack for displaying upload button and camera icon used for
 * uploading pictures.
 * @return {Stack} Rendered Stack.
 */
function CameraButtons({control, useStateValue, setUseStateFunc, buttonId,
  name, iconId, setURL}) {
  // Used for Input component.
  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Stack
      direction="column"
      sx={{
        display: 'flex',
        paddingTop: '15px',
        alignItems: 'center',
      }}>

      {/* buttonId is a button that
      an user can click to upload a picture. */}
      <label htmlFor={buttonId}>
        <Controller
          name={name}
          control={control}
          rules={{required: 'Select an image'}}
          render={({field: {onChange}, fieldState: {error}}) => (

            <Input
              accept="image/*"
              id={buttonId}
              multiple type="file"
              onChange={(e) => {
                onChange(e.target.files.item(0));
                setUseStateFunc(1);
                setURL(URL.createObjectURL(e.target.files[0]));
              }}
              error={error}
            />
          )}/>

        <Button
          variant="contained"
          component="span"
          sx={{
            'backgroundColor': Colors.trasteNavyBlue,
            ':hover': {backgroundColor: Colors.trastePurple},
            'height': 20,
          }}>
          Upload
        </Button>
      </label>

      <Stack
        style={{display: 'flex'}}
        direction='row'
        spacing={2}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'space-evenly',
        }}>

        {/* iconId is a camera icon.
        When clicked opens an user's camera on the phone. */}
        <label htmlFor={iconId}>
          <Controller
            name={name}
            control={control}
            rules={{required: 'Select an image'}}
            render={({field: {onChange}, fieldState: {error}}) => (

              <Input
                accept="image/*"
                id={iconId}
                multiple type="file"
                onChange={(e) => {
                  onChange(e.target.files[0]);
                  setUseStateFunc(1);
                  setURL(URL.createObjectURL(e.target.files[0]));
                }}
                error={error}
              />
            )}
          />

          <IconButton
            aria-label="upload picture"
            component="span"
            sx={{
              'color': Colors.trasteNavyBlue,
              ':hover': {color: Colors.trastePurple},
            }}>
            <PhotoCamera />
          </IconButton>
        </label>

        <CheckIcon
          sx={{
            paddingTop: 0.9,
            color: () => (useStateValue === 1 ?
                    Colors.trasteNavyBlue : 'transparent'),
          }}>
        </CheckIcon>
      </Stack>
    </Stack>
  );
}

CameraButtons.propTypes = {
  control: PropTypes.any.isRequired,
  useStateValue: PropTypes.any.isRequired,
  setUseStateFunc: PropTypes.any.isRequired,
  buttonId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconId: PropTypes.string.isRequired,
  setURL: PropTypes.func.isRequired,
};

export default CameraButtons;
