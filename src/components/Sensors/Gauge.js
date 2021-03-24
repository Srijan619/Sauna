/*
    Component NAME
 */

import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ReactSpeedometer from 'react-d3-speedometer';

const useStyles = makeStyles(theme => ({
  gauge: {
    height: '100%',
    width: '100%',
    fontFamily: 'Roboto'
  }
}));

const Component = props => {
  const classes = useStyles();

  return (
    <div className={classes.gauge}>
      <ReactSpeedometer
        currentValueText={`${props.temp} °C`}
        value={props.temp}
        minValue={props.minTemp}
        maxValue={props.maxTemp}
        labelFontSize="14px"
        valueTextFontSize="1.8rem"
        needleHeightRatio={0.8}
        needleTransitionDuration={2000}
        maxSegmentLabels={5}
        segments={1000}
        fluidWidth
        needleColor="#000000"
        startColor="#00cb42"
        endColor="#ff0800"
        paddingVertical={8}
      />
    </div>
  );
};

export default React.memo(Component);
