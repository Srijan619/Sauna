import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import saunaImage from '../../assets/img/sauna_search2.jpg';
import { AuthContext } from '../Auth/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  containerHeader: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${saunaImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderBottomRightRadius: '40px',
    fontFamily: 'Roboto, sans-serif',
    minHeight: '30vh',
    [theme.breakpoints.up('sm')]: {
      borderBottomRightRadius: '0',
      maxWidth: '1500px',
      margin: '0 auto',
      minHeight: '40vh'
    }
  },
  container: {
    padding: '20px',
    margin: '0 auto'
  },
  button: {
    margin: '10px',
    color: 'white',
    borderColor: 'white',
    background: '#00000054',
    '&:hover': {
      color: 'black',
      background: theme.palette.primary.contrastText
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.containerHeader}>
      <div className={classes.container}>
        {console.log(currentUser)}
        {currentUser && currentUser ? (
          <h2>Hi, {currentUser.displayName}</h2>
        ) : (
          <h2>Hi, User!</h2>
        )}
        <h2>Feeling cold?</h2>
      </div>
      <div className={classes.container}>
        <Button variant="outlined" className={classes.button}>
          Visit a sauna
        </Button>
        <Link to="/createsauna">
          <Button variant="outlined" className={classes.button}>
            Become a host
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
