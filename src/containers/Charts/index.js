import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import LineGraph from '../../components/LineGraph';
import MapGraph from '../../components/MapGraph';
import { useDataProvider } from '../DataProvider';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',    
    minHeight: 300,
  },
  map: {
    height: 400,
    width: 800,
  },
  line: {
    height: 400,
    width: 800,
  },
}));

export default function Charts() {
  const { state, loadCountry } = useDataProvider();
  const { country, global } = state;
  const onSelect = useCallback((event) => {
    loadCountry(event.id);
  }, []);
  const classes = useStyles();
  return (
    <Grid item sm={12} md={9}>
      <Grid container spacing={1}>
        <Grid item xs={12} justify="center">
          <Paper className={classes.paper}>
            {global.loading && <CircularProgress />}
            {!global.loading && !global.error && <MapGraph data={global.data} onClick={onSelect} />}
          </Paper>
        </Grid>
        <Grid item xs={12} justify="center">
          <Paper className={classes.paper} justify="center">
            {country.loading && <CircularProgress />}
            {!country.loading && !country.error && <LineGraph data={country.data} />}
          </Paper>
        </Grid>
      </Grid>
    </Grid>    
  )
}