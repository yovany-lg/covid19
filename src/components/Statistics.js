import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red, blueGrey, lightGreen } from '@material-ui/core/colors';
import { useDataProvider } from '../containers/DataProvider';
import countries from '../assets/country_list_esp.json';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0, 0, 0),
    justifyContent: 'center'
  },
  confirmed: {
    color: red[500],
  },  
  deaths: {
    color: blueGrey[500],
  },  
  recovered: {
    color: lightGreen[500],
  },
  country: {
    padding: theme.spacing(0, 0, 0, 0),
  }
}));

export default function SimpleCard() {
  const classes = useStyles();
  const [label, updateLabel] = useState('');
  const { state } = useDataProvider();
  const { country } = state;
  useEffect(() => {
    if (country.data !== null) {
      updateLabel(countries.find(item => item.code === country.data.code).label);
    }
  }, [country.data, updateLabel]);  
  return (
    <Grid container spacing={1} className={classes.root}>
      {country.loading && <CircularProgress />}
      {!country.loading && !country.error && (
        <>
          <Grid item xs={12}>
            <Typography variant="h5">
              {label}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Casos
                </Typography>        
                <Typography variant="h5" component="h5" className={classes.confirmed}>
                  {new Intl.NumberFormat('en-US').format(country.data.latest.cases)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Recuperados
                </Typography>        
                <Typography variant="h5" component="h5" className={classes.recovered}>
                  {new Intl.NumberFormat('en-US').format(country.data.latest.recovered)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Fallecidos
                </Typography>        
                <Typography variant="h5" component="h5" className={classes.deaths}>
                  {new Intl.NumberFormat('en-US').format(country.data.latest.deaths)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}
