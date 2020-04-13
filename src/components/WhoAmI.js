import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Facebook from '@material-ui/icons/Facebook';
import YouTube from '@material-ui/icons/YouTube';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    // display: 'none',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  dialog: {
    backgroundColor: grey[200]
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyCard = () => (
  <Card>
    <CardHeader
      title="José Yovany Luis García"
      subheader="Senior Software Engineer"
    />
    <CardContent>
      <Typography variant="body1" color="textSecondary" component="p">
        Soy Sr. Desarrollador de Software, principalmente enfocado en aplicaciones Web y aplicaciones Móviles.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton
        aria-label="My LinkedIn"
        color="primary"
        href="http://bit.ly/yovany-luis-linkedin"
        target="_blank"
      >
        <LinkedIn />
      </IconButton>
      <IconButton
        aria-label="My Facebook"
        color="primary"
        href="https://bit.ly/cursaweb-facebook"
        target="_blank"
      >
      <Facebook />
      </IconButton>
      <IconButton
        aria-label="My Youtube"
        color="primary"
        href="http://bit.ly/cursa-web-youtube"
        target="_blank"
      >
        <YouTube />
      </IconButton>
      <IconButton
        aria-label="share"
        color="secondary"
        href={`https://www.facebook.com/sharer/sharer.php?u=${'https://covid19-app-red.now.sh/'}&t="Estadísticas COVID-19"`}
        target="_blank"
      >
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>  
)

export default function AlertDialogSlide() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.sectionDesktop}>
      <IconButton
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleClickOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Creado por: </DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText id="alert-dialog-slide-description">
            <MyCard />
          </DialogContentText>
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
