import React, { useCallback, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

/* eslint-disable no-use-before-define */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import countries from '../assets/country_list_esp.json';
import { useDataProvider } from '../containers/DataProvider';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const renderOption = (option) => (
  <React.Fragment>
    <span>{countryToFlag(option.code)}</span>
    {option.label} ({option.code}) +{option.phone}
  </React.Fragment>
);

const renderInput = (params) => (
  <TextField
    {...params}
    label="Choose a country"
    variant="outlined"
    inputProps={{
      ...params.inputProps,
      autoComplete: 'new-password', // disable autocomplete and autofill
    }}
  />
)

function CountrySelect({ closeDialog }) {
  const classes = useStyles();
  const [value, setValue] = useState({});
  const { loadCountry, state } = useDataProvider();
  const { country: { data } } = state;
  useEffect(() => {
    if (data !== null) {
      const currentCountry = countries.find(item => item.code === data.code);
      setValue(currentCountry);
    }
  }, [data]);
  const updateValue = useCallback((event, newValue) => {
    if (newValue !== null) {
      loadCountry(newValue.code);
      closeDialog();
    }
  }, []);
  const getOptionLabel = useCallback(option => option.label, []);
  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: '100%' }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
      onChange={updateValue}
      value={value}
    />
  );
}

export default function FormDialog() {
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
        <SearchIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Selecciona el País</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecciona un País para mostrar las estadísticas de COVID-19.
          </DialogContentText>
          <CountrySelect closeDialog={handleClose} />
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
