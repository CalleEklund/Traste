import React from 'react';

import {TextField, InputAdornment} from '@mui/material';

/**
 * Custom TextField for displaying a procentage for a specified material.
 * @param {*} label Name of field.
 * @param {*} value Starting value.
 * @param {*} onChange Handler.
 * @param {*} error What will be shown for the error.
 * @return {TextField} Rendred field.
 */
function MaterialField({label, value, onChange, error}) {
  return (
    <TextField
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position='start' disableTypography={true}>
            %
          </InputAdornment>
        ),
      }}
      variant='outlined'
      type='number'
      onFocus={(event) => {
        event.target.select();
      }}
      onBlur={(evt) => {
        if (evt.target.value === '') {
          onChange(0);
        }
      }}
      value={value}
      onChange={onChange}
      sx={{
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
      inputProps={{
        'style': {textAlign: 'right', fontSize: 16},
        'data-testid': 'materialfield',
      }}
      error={!!error}
      // helperText={error ? error.message : null}
    />
  );
}

MaterialField.propTypes = {
  label: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
};

export default MaterialField;
