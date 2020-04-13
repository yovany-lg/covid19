import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { grey } from '@material-ui/core/colors';

import Statistics from './Statistics';

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: grey[100]
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClickOpen}
        color="inherit"
      >
        <AssessmentIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        
      >
        <DialogTitle id="max-width-dialog-title">Estadísticas</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Statistics />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
