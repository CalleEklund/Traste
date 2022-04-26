import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import {Colors} from './Colors.js';

export const binsizes = [
  {
    id: '0',
    label: 5,
  },
  {
    id: '1',
    label: 10,
  },
  {
    id: '2',
    label: 15,
  },
  {
    id: '3',
    label: 20,
  },
];

export const wasteTypes = {
  Wood: 0,
  Plastic: 0,
  Concrete: 0,
  Metal: 0,
  Other: 0,
};

export const sites = [
  {
    id: '0',
    label: 'Linköping',
  },
  {
    id: '1',
    label: 'Norrköping',
  },
  {
    id: '2',
    label: 'Gustavsberg',
  },
  {
    id: '3',
    label: 'Vetlanda',
  },
];

export const successSx = {
  width: '100%',
  backgroundColor: Colors.trasteGreen,
  color: '#103849',
  fontSize: 18,
};

export default {
  binsizes, wasteTypes, sites, successSx,
};

export const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props;
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <DialogTitle sx={{m: 0, p: 2, alignContent: 'center'}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
