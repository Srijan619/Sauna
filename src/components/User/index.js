import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import SignOut from '../Auth/SignOut';
import { AuthContext } from '../Auth/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    fontFamily: 'Roboto',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),

    },
    paddingBottom:theme.spacing(5)
  },
  signout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  button: {
    marginLeft: theme.spacing(1),
    width: 'fit-content',
    textDecoration: 'none'
  },
  save: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16
  }
}));

const User = () => {
  const { currentUser } = useContext(AuthContext);
  
  let [editOpen,setEditOpen]=useState();
  const classes = useStyles();
  return (
    <>
      {currentUser ? (
        <div className={classes.root}>
          <div className={classes.signout}>
            <Avatar alt="profile picture" src="" className={classes.large} />
            <SignOut />
          </div>
          <h1 style={{ fontFamily: 'Lobster', marginBottom: 20 }}>
            Edit personal Info
        </h1>
         
          <TextField disabled={!editOpen} label="First Name" name="firstName" color="primary" variant="filled" defaultValue="User-first-name"></TextField>
          <TextField disabled={!editOpen} label="Last Name" name="lastName" color="primary" variant="filled" defaultValue="User-last-name"></TextField>
          <TextField disabled={!editOpen} label="Birth Date" type="date" name="birthDate" color="primary" variant="filled" defaultValue="2017-05-24" InputLabelProps={{
            shrink: true,
          }}></TextField>
          <TextField disabled={!editOpen} label="Email Address" name="email" color="primary" variant="filled" defaultValue={currentUser.email}></TextField>
          <div className={classes.save}>
          {editOpen ?  (<IconButton aria-label="Save" className={classes.save} onClick={()=> setEditOpen(!editOpen)}   >
              Save<CheckIcon fontSize="large" />
            </IconButton>):(<IconButton aria-label="S ave" className={classes.save} onClick={setEditOpen}>
             Edit<EditIcon fontSize="large" />
            </IconButton>)}
        
          </div>
          <Link to="/ownsauna" className={classes.button}>
            {' '}
            <Button color="primary">My Saunas</Button>
          </Link>
          <Button className={classes.button} color="primary">
            My Sauna History
          </Button>
          <Button className={classes.button} color="primary">
            Order Sensors
          </Button>
          <Button className={classes.button} color="primary">
            Reviews
          </Button>

          {/** 
          <p>{currentUser.displayName}</p>
          <p>{currentUser && currentUser.email}</p>
          <p>Edit profile</p>
          <p>My sauna history</p>
          <p>Order sensors</p>
       */}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default User;
