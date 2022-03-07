import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@mui/material';

/**
 * Custom TextField used for different data in the RenderPage.
 * @param {*} label Name of field.
 * @param {*} value Starting value.
 * @param {*} onChange Handler.
 * @param {*} error What will be shown for the error.
 * @param {*} type What type of values. Usally number or text.
 * @return {TextField} Rendred field
 */
function Inputfield({label, value, onChange, error, type}) {
  return (
    <TextField
      label={label}
      variant='outlined'
      sx={{
        marginTop: '15px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: '90vw',
      }}
      value={value}
      type={type}
      onChange={onChange}
      inputProps={{'data-testid': 'inputfield'}}
      error={!!error}
      // helperText={error ? error.message : null}
    />
  );
}

Inputfield.defaultProps = {
  error: false,
  type: 'text',
};

Inputfield.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export default Inputfield;
