import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './index.css';
import TextField from '@material-ui/core/TextField';
import { compose } from 'recompose';
import { AuthContext } from '../Auth/Auth';
import googleIcon from '../../assets/img/google-icon.svg';
import { withFirebase } from '../../Firebase';
import Signup from '../Auth/SignUp';

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
    justifyContent: 'center',
    '& > button': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
      color: 'black',
      borderRadius: 25,
      fontFamily: 'Roboto',
      textTransform: 'none',
      fontWeight: 'bold',
      overflow: 'hidden'
    }
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fafafa'
    },
    secondary: {
      main: '#fafafa'
    }
  }
});

const Login = ({ history, firebase }) => {
  const [errors, setErrors] = useState();
  const [registering, setRegistering] = useState();
  const classes = useStyles();

  const handleGoogleLogin = useCallback(
    async event => {
      event.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase.auth().signInWithRedirect(provider);
        history.push('/');
      } catch (error) {
        setErrors(error);
      }
    },
    [firebase, history]
  );

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        setErrors(error);
      }
    },
    [firebase, history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="containerM">
      <div className="titleContainer">
        <h1 style={{ fontFamily: 'Lobster', marginBottom: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Saunaan
          </Link>
        </h1>
      </div>
      <p style={{ fontFamily: 'Roboto', marginBottom: theme.spacing(3) }}>
        Nearby saunas, at your fingertips
      </p>
      <MuiThemeProvider theme={theme}>
        {registering ? (
          <Signup />
        ) : (
          <>
            <form className={classes.root} onSubmit={handleLogin}>
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

              <Button
                className="buttonLogin"
                variant="outlined"
                id="buttonLogin"
                type="submit"
              >
                Login
              </Button>
            </form>
            <p
              style={{
                color: 'white',
                fontFamily: 'Roboto Mono',
                fontSize: '1'
              }}
            >
              ─────── OR ───────
            </p>
            <div className={classes.button}>
              {/* TODO: Add FB Login
            <Button
              variant="contained"
              color="primary"
              style={{ color: 'white' }}
            >
              <IconButton id="searchButton">
                <FacebookIcon />
              </IconButton>
              Sign in with Facebook
            </Button> */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGoogleLogin}
                type="submit"
              >
                <img
                  src={googleIcon}
                  height={25}
                  width={25}
                  style={{ padding: '5px' }}
                  alt=""
                />
                Sign in with Google
              </Button>
            </div>
            <p style={{ fontFamily: 'Roboto', marginTop: theme.spacing(3) }}>
              No account?{' '}
              <Button style={{ color: 'white' }} onClick={setRegistering}>
                Register
              </Button>
            </p>
          </>
        )}
        {errors && (
          <p
            style={{
              color: 'white',
              fontFamily: 'Roboto',
              maxWidth: '60%',
              textAlign: 'center',
              margin: 0
            }}
          >
            {errors.message}
          </p>
        )}
      </MuiThemeProvider>
    </div>
  );
};

export default compose(withFirebase, withRouter)(Login);
