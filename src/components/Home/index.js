import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import Header from '../Header';
import SaunaList from '../Sauna/SaunaList';
import CookiePopUp from '../CookiePolicy/CookiePopUp';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '0 auto 100px',
    [theme.breakpoints.up('sm')]: {
      borderBottomRightRadius: '0',
      maxWidth: '1500px',
      margin: '0 auto 80px',
      minHeight: '40vh'
    }
  },
  card: {
    marginLeft: '0.5em'
  }
}));

function Index() {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <SaunaList />
      </div>
      {/* <CookiePopUp/> */}
    </div>
  );
}

export default Index;
