/*
    Component NAME
 */

import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chart from 'react-google-charts';
import Typography from '@material-ui/core/Typography/Typography';

const useStyles = makeStyles(theme => ({
  gridContainer: { width: '100%' },
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem'
  },
  gridItem: {},
  title: {
    marginLeft: '1rem'
  },
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

  const [mold, setMold] = useState([]);
  const [moldTOT, setMoldTOT] = useState([]); // setChartDataMold
  const [ChartDataMold, setChartDataMold] = useState([]);

  useEffect(() => {
    console.log(`Temp:${props.listTemp.length}`);
    console.log(`Hum:${props.listHum.length}`);
    console.log(`Time:${props.listTime.length}`);

    const moldList = [];
    const moldListTot = [];

    let moldAccount = 0;
    const MOLD_WEIGHT = 100;
    let i = 0;

    for (i; i < props.listTime.length; i++) {
      const temp = props.listTemp[i];
      const humidity = props.listHum[i];
      const time = props.listTime[i];
      let mold_round_points = 0;

      if (humidity > 50.0) {
        const point_num = (humidity - 50) / 50;
        const mold_point = MOLD_WEIGHT * point_num;
        mold_round_points += mold_point;

        if (temp > 10.0 < 15.0 || temp > 27.0 < 35.0) {
          mold_round_points *= 1.1;
        } else if (temp >= 15.0 <= 27.0) {
          mold_round_points *= 1.3;
        } else {
          mold_round_points *= 0;
        }
      } else {
        // IF values are unfavorable for mold the growth will decease
        if (moldAccount > 0) {
          // If accout has postive
          const point_num = 1 - humidity / 50;
          mold_round_points = -MOLD_WEIGHT * point_num;
        } else {
          // if account value getting negative
          moldAccount = 0;
        }
      }

      moldList.push(mold_round_points);
      moldAccount += mold_round_points;
      moldListTot.push(moldAccount);
    }

    console.log('Mold List: ', moldList);
    setMold(moldList);
    console.log('Mold List TOT: ', moldListTot);
    setMoldTOT(moldListTot);

    const chartData = [];
    chartData.push(['x', 'Mold']);
    for (let j = 0; j < moldListTot.length; j++) {
      chartData.push([props.listTime[j], moldListTot[j]]);
    }
    setChartDataMold(chartData); // Setting chart data
  }, [props.listHum, props.listTemp, props.listTime]);

  return (
    <div className={classes.card}>
      <Typography variant="h4" className={classes.title}>
        Mold Account Total: {moldTOT[moldTOT.length - 1]}
      </Typography>
      <Chart
        width="100%"
        height="60vw"
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={ChartDataMold}
        options={{
          hAxis: {
            title: 'Time'
          },
          vAxis: {
            title: 'Mold account'
          },
          series: {
            0: { curveType: 'function' }
          },
          animation: {
            startup: true,
            easing: 'linear',
            duration: 4000
          }
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
};

export default React.memo(Component);
