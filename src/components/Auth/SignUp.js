import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Avatar from '@material-ui/core/Avatar';
import { withFirebase } from '../../Firebase';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: 200,
    left: theme.spacing(5),
    color: 'white',
    overflow: 'hidden'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& > button': {
      margin: theme.spacing(5),
      width: '100%',
      color: 'black',
      borderRadius: 25,
      fontFamily: 'Roboto',
      textTransform: 'none',
      fontWeight: 'bold',
      overflow: 'hidden'
    }
  },
  buttonAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

const SignUp = ({ history, firebase }) => {
  const [errors, setErrors] = useState();

  const [selectedDate, setSelectedDate] =useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const { db } = firebase;

  const handleSignUp = useCallback(
  
    async event => {
      event.preventDefault();
      const { email, password,firstName,surName,birthDay,rePassword } = event.target.elements;
      if(rePassword.value===password.value){
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
          await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
          await firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              firebase.db.collection('users').doc(user.uid).set({
                userId:user.uid,
                firstName: firstName.value,
                surname: surName.value,
                birthday: birthDay.value
              })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
              console.log("user created");
            } else {
              // User is signed out.
            }
          });
        history.push('/');
      } catch (error) {
        setErrors(error);
      }}
      else{
         setErrors("Password doesn't match")
      }
    },
    [history, firebase]
  );

  return (
    <div>
      <form className={classes.root} onSubmit={handleSignUp}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar alt="profile picture" src="" className={classes.large} />
        </div>
        <TextField
          id="standard-firstname-input"
          label="First Name"
          type="text"
          name="firstName"
          margin="normal"
          color="primary"
          autoComplete="off"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          style={{ width: '100%' }}
        />
        <TextField
          id="standard-lastname-input"
          label="Last Name"
          type="text"
          name="surName"
          margin="normal"
          color="primary"
          autoComplete="off"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          style={{ width: '100%' }}
        />
        <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} color="primary">
        <KeyboardDatePicker
          color="primary"
          margin="normal"
          id="date-picker-dialog"
          label="Birth Date"
          name="birthDay"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              color: 'white',
            }
          }}
          keyboardIcon={<CalendarTodayIcon style={{color:"white"}}></CalendarTodayIcon>}
        />
        
        </MuiPickersUtilsProvider></ThemeProvider>
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          color="primary"
          autoComplete="off"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          style={{ width: '100%' }}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          margin="normal"
          color="primary"
          autoComplete="new-password"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          style={{ width: '100%' }}
        />
        <TextField
          id="standard-repassword-input"
          label="Re-Type Password"
          type="password"
          name="rePassword"
          margin="normal"
          color="primary"
          autoComplete="new-password"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }
          }}
          style={{ width: '100%' }}
        />
        <div className={classes.buttonAlign}>
          <Button
            className={classes.button}
            variant="outlined"
            id="buttonLogin"
            type="submit"
          >
            Sign Up
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            id="buttonLogin"
          >
            Sign In
          </Button>
        </div>
      </form>
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default compose(withFirebase, withRouter)(SignUp);
