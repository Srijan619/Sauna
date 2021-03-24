/*
    Humidity bar
 */

import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';

const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  border: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: '0.4rem',
    borderWidth: '2px',
    height: '70%',
    width: '1rem',
    backgroundColor: '#004dd4'
  },
  innerArea: {
    backgroundColor: '#fff',
    borderRadius: '0.3rem 0.3rem 0rem 0rem'
  }
}));

const Component = props => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.border}>
        <div
          className={classes.innerArea}
          style={{ height: `${100 - props.humidity}%` }}
        />
      </div>
      <Typography variant="h6" className={classes.title}>
        {props.humidity} %
      </Typography>
    </div>
  );
};

export default React.memo(Component);
