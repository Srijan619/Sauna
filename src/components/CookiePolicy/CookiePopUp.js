import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    color: '#0bff00'
  },
  buttonRead: {
    marginLeft: '2rem'
  }
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // useEffect( () => {
  //   setOpen(true);
  // },[]);

  return (
    <div>
      <Snackbar
        key="KEy"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={20000}
        onClose={handleClose}
        // onExited={handleExited}
        message="We are using cookies to improve user experiences"
        action={
          <>
            <Button
              color="primary"
              size="small"
              onClick={handleClose}
              component={Link}
              to="/cookies"
              className={classes.buttonRead}
            >
              read more
            </Button>

            <Button
              color="secondary"
              size="small"
              onClick={handleClose}
              className={classes.button}
            >
              I Agree
            </Button>
          </>
        }
      />
    </div>
  );
}
