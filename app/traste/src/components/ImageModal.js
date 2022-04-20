import React from 'react';
import {Modal} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * a
 * @param {*} param0 a
 * @return {*} a
 */
function ImageModal({text, closeHandler, isOpen}) {
  return (
    <Modal
      open={isOpen}
      onClose={closeHandler}
      style={{display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', marginTop: '10vh'}}
    >
      <img src={text} alt="Firestore Photo"
        width={'100%'} onClick={closeHandler}/>
    </Modal>);
}

ImageModal.propTypes = {
  text: PropTypes.string,
  closeHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ImageModal;
