import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import { AuthContext } from '../Auth/Auth';
import './index.css';

const Footer = () => {
  const [value, setValue] = React.useState('');
  const { currentUser } = useContext(AuthContext);

  return (
    <Paper>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="bottomNav"
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          value="discover"
          label="Discover"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/map"
          value="nearby"
          label="Nearby"
          icon={<LocationOnIcon />}
        />
        {/* <BottomNavigationAction */}
        {/*    component={Link} */}
        {/*    to="/list" */}
        {/*    value="list" */}
        {/*    label="List" */}
        {/*    icon={<ListIcon/>} */}
        {/* /> */}
        <BottomNavigationAction
          component={Link}
          to="/sensors"
          value="sensors"
          label="SaunaLabs"
          icon={<HouseRoundedIcon />}
        />
        100vw
        {currentUser ? (
          <BottomNavigationAction
            component={Link}
            to="/user"
            value="user"
            label="Profile"
            icon={<PersonIcon />}
          />
        ) : (
          <BottomNavigationAction
            component={Link}
            to="/login"
            value="login"
            label="Login"
            icon={<PersonIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
