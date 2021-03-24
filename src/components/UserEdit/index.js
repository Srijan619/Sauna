import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import { withFirebase } from '../../Firebase';
import { AuthContext } from '../Auth/Auth';

const useStyles = makeStyles(theme => ({
  form: {},
  button: {
    // backgroundColor: '#afffbe'
  }
}));

const User = ({ firebase }) => {
  const { currentUser } = useContext(AuthContext);
  const { db } = firebase;
  const classes = useStyles();

  const [birthday, setBirthday] = useState('');
  const [firstName, setFirstName] = useState('');
  const [sureName, setSureName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const userInfo = db.collection('users').doc(currentUser.uid);

    userInfo
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setPhoneNumber(doc.data().phoneNumber);
          setBirthday(doc.data().birthday);
          setFirstName(doc.data().firstName);
          setSureName(doc.data().sureName);
          setIsHost(doc.data().isHost);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  }, [db, currentUser]);

  const save = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .set({
        isHost,
        phoneNumber,
        birthday,
        firstName,
        sureName
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  };

  const changePhoneNum = event => {
    setPhoneNumber(event.target.value);
  };
  const changeFirstName = event => {
    setFirstName(event.target.value);
  };
  const changeSureName = event => {
    setSureName(event.target.value);
  };
  const changeBirthday = event => {
    setBirthday(event.target.value);
  };
  const changeIsHost = event => {
    setIsHost(!isHost);
  };

  return (
    <>
      {currentUser ? (
        <>
          <h1>Edit your information</h1>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  value={firstName}
                  onChange={changeFirstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Sureame"
                  value={sureName}
                  onChange={changeSureName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Phone number"
                  value={birthday}
                  onChange={changeBirthday}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Phone number"
                  value={phoneNumber}
                  onChange={changePhoneNum}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <p>Is host </p>
                <Checkbox
                  checked={isHost}
                  onChange={changeIsHost}
                  value={isHost}
                  color="primary"
                />
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={save}
                  component={Link}
                  to="/user"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default withFirebase(User);

// frnamn
// Efternman
// kön
// epost - + lösen
