/*
    Analytics over sauna, intended user is sauna owner
 */
import React, {useState, useEffect} from 'react';
import Chart from 'react-google-charts';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {withFirebase} from '../../Firebase';
import CardBigTempHumidity from './CardTempHumidity';
import CardTemp from "./CardTemp";

// Component style
const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbdbdb'
  },
  gridContainer: {
    width: '98vw'
  },
  gridItem: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    textAlign: 'center'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: '0.5em',
    marginBottom: '0.5em'
  },
  gauge: {
    height: '55vw',
    width: '90vw'
  },
  footerSpace: {
    height: '5rem'
  }
}));

const Sensors = ({firebase}) => {
  const {db} = firebase;
  const classes = useStyles();

  // Real time updates
  const [caHumidity, setCaHumidity] = useState(0);
  const [caTemp, setCaTemp] = useState(0);
  const [caTime, setCaTime] = useState(0);
  const [caBattery, setCaBattery] = useState(0);
  const [caPressure, setCaPressure] = useState(0);


  const [E8Humidity, setE8Humidity] = useState(0);
  const [E8Temp, setE8Temp] = useState(0);
  const [E8Time, setE8Time] = useState(0);
  const [E8Battery, setE8Battery] = useState(0);
  const [E8Pressure, setE8Pressure] = useState(0);

  const [F5Humidity, setF5Humidity] = useState(0);
  const [F5Temp, setF5Temp] = useState(0);
  const [F5Time, setF5Time] = useState(0);
  const [F5Battery, setF5Battery] = useState(0);
  const [F5Pressure, setF5Pressure] = useState(0);

  const [DSTemp, setDSTemp] = useState(0);
  const [DSTime, setDSTime] = useState(0);


  useEffect(() => {
    // Listening to real time updates
    db.collection('Sensors')
      .doc('CA:1F:59:A3:79:65')
      .onSnapshot(function (doc) {
        // console.log("CA data: ", doc.data());
        setCaHumidity(doc.data().humidity);
        setCaTemp(doc.data().temperature);
        let time = new Date(doc.data().time.toDate());
        let strTime = (time.getHours()) + ":" + time.getMinutes() + " " + time.getDate() + "." + (time.getMonth() + 1)
        setCaTime(strTime);
        setCaBattery(doc.data().battery);
        setCaPressure(doc.data().pressure);
      });
    db.collection('Sensors')
      .doc('E8:BC:35:AF:DD:ED')
      .onSnapshot(function (doc) {
        // console.log("E8 data: ", doc.data());
        setE8Humidity(doc.data().humidity);
        setE8Temp(doc.data().temperature);

        let time = new Date(doc.data().time.toDate());
        let strTime = (time.getHours()) + ":" + time.getMinutes() + " " + time.getDate() + "." + (time.getMonth() + 1)
        setE8Time(strTime);

        setE8Battery(doc.data().battery);
        setE8Pressure(doc.data().pressure);
      });
    db.collection('Sensors')
      .doc('F5:65:AE:43:2E:38')
      .onSnapshot(function (doc) {
        // console.log("F5 data: ", doc.data());
        setF5Humidity(doc.data().humidity);
        setF5Temp(doc.data().temperature);

        let time = new Date(doc.data().time.toDate());
        let strTime = (time.getHours()) + ":" + time.getMinutes() + " " + time.getDate() + "." + (time.getMonth() + 1)
        setF5Time(strTime);

        setF5Battery(doc.data().battery);
        setF5Pressure(doc.data().pressure);
      });
    db.collection('Sensors')
      .doc('DS18B20')
      .onSnapshot(function (doc) {
        setDSTemp(doc.data().temp);
        let time = new Date(doc.data().time.toDate());
        let strTime = (time.getHours()) + ":" + time.getMinutes() + " " + time.getDate() + "." + (time.getMonth() + 1)
        setDSTime(strTime);
      });
  }, [db]);

  return (
    <div className={classes.body}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.gridContainer}
        spacing={2}
      >
        <Grid item xs={12} className={classes.center}>
          <Typography variant="h3" className={classes.title}>
            <b>Your Sauna analysis</b>
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.card}>
            <CardBigTempHumidity
              title="Out Door"
              temp={F5Temp}
              humidity={F5Humidity}
              minTemp={-25}
              maxTemp={40}
            />
            <Typography variant="body1" className={classes.text}>
              Battery: {F5Battery}
              <br/>
              Pressure: {F5Pressure}
              <br/>
              Time: {F5Time}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.card}>
            <CardBigTempHumidity
              title="Shower"
              temp={E8Temp}
              humidity={E8Humidity}
              minTemp={0}
              maxTemp={50}
            />
            <Typography variant="body1" className={classes.text}>
              Battery: {E8Battery}
              <br/>
              Pressure: {E8Pressure}
              <br/>
              Time: {E8Time}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.card}>
            <CardBigTempHumidity
              title="Sauna"
              temp={caTemp}
              humidity={caHumidity}
              minTemp={0}
              maxTemp={100}
            />
            <Typography variant="body1" className={classes.text}>
              Battery: {caBattery}
              <br/>
              Pressure: {caPressure}
              <br/>
              Time: {caTime}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.card}>
            <CardTemp
              title="Sea temperature"
              temp={DSTemp}
              minTemp={-5}
              maxTemp={25}
            />
            <Typography variant="body1" className={classes.text}>
              Time: {DSTime}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div className={classes.footerSpace}/>
    </div>
  );
};

export default withFirebase(Sensors);
