import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';

import DataProvider, { useDataProvider } from './containers/DataProvider';
import Charts from './containers/Charts';
import Statistics from './components/Statistics';
import DialogStatistics from './components/DialogStatistics';
import CountrySelectorDialog from './components/CountrySelectorDialog';
import CountrySelector from './components/CountrySelector';
import WhoAmI from './components/WhoAmI';
import countries from './assets/country_list_esp.json';

const useStyles = makeStyles(theme => ({
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    padding: theme.spacing(2, 0, 2, 0),
    backgroundColor: grey[100],
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 0, 12, 0),
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      width: 200,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  return (
    <DataProvider>
      <div className={classes.grow}>
        <CssBaseline />
        <Hidden xsDown>
          <AppBar>
            <Container maxWidth="lg">
              <Toolbar>
                <Hidden xsDown>
                  <Typography variant="h6">COVID-19</Typography>
                </Hidden>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <CountrySelector />
                </div>
                <Hidden mdUp>
                  <DialogStatistics />
                </Hidden>
                <WhoAmI />      
              </Toolbar>
            </Container>
          </AppBar>
        </Hidden>
        <main className={classes.content}>
          <Hidden xsDown>
            <div className={classes.toolbar} />
          </Hidden>
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Charts />
              <Hidden smDown>
                <Grid item sm={12} md={3}>
                  <Statistics />
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </main>
        <Hidden smUp>
          <BottomAppBar />
        </Hidden>
      </div>
    </DataProvider>
  );
}

const barStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));


const BottomAppBar = () => {
  const classes = barStyles();
  const [label, updateLabel] = useState('');
  const { state } = useDataProvider();
  const { country } = state;
  useEffect(() => {
    if (country.data !== null) {
      updateLabel(countries.find(item => item.code === country.data.code).label);
    }
  }, [country.data, updateLabel]);  
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="subtitle1">{label}</Typography>
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <CountrySelectorDialog />
        </Fab>
        <div className={classes.grow} />      
        <DialogStatistics />
        <WhoAmI /> 
      </Toolbar>
    </AppBar>
  );
}
