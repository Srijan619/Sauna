/*
    Component holding temperature gauge and vertical humidity bar
 */

import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import TempGauge from './Gauge';
import VerticalBar from './BarVertical';

const useStyles = makeStyles(theme => ({
  gridContainer: { width: '100%' },
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem'
  },
  gridItem: {},
  title: {},
  boxItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85vw'
  },
  boxGauge: {
    height: '40vw',
    width: '70%'
  },
  bar: {
    height: '40vw',
    width: '30%'
  }
}));

const Component = props => {
  const classes = useStyles();

  //      const [tabIndex, setTabIndex] = useState(0);
  //
  //     useEffect(() =>{
  //         console.log('new tab index set ' + index);
  //         if (index >= 0 && index <= 3){
  //             setTabIndex(index);
  //         }
  //     }, [tabIndex]);

  return (
    <div className={classes.card}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h4" className={classes.title}>
            {props.title}
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.boxItems}>
            <div className={classes.boxGauge}>
              <TempGauge
                temp={props.temp}
                minTemp={props.minTemp}
                maxTemp={props.maxTemp}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Component);
