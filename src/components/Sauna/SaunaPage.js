import React, { Component } from 'react';
import './SaunaDetails.css';
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles, withTheme } from '@material-ui/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WavesIcon from '@material-ui/icons/Waves';
import PaymentIcon from '@material-ui/icons/Payment';
import { withFirebase } from '../../Firebase';
import { AuthContext } from '../Auth/Auth';
import ImageStepper from './ImageStepper';
import Map from '../Map';
import Reviews from './Reviews';

const styles = theme => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    '& > button': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
      color: 'white',
      borderRadius: 2,
      textAlign: 'center',
      height: '100%',
      fontFamily: 'Roboto',
      textTransform: 'none',
      fontWeight: 'bold',
      overflow: 'hidden'
    }
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(7),
    right: theme.spacing(2)
  },
  container: {
    position: 'relative'
  }
});

class SaunaPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      saunaData: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { db } = this.props.firebase;

    db.collection('saunas')
      .doc(id)
      .get()
      .then(docRef => {
        this.setState({
          saunaData: docRef.data()
        });
      })
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message
      }));
  }

  renderImages = imageUrls => {
    const { saunaData } = this.state;
    const images = [];
    if (imageUrls) {
      imageUrls.map(url =>
        images.push({ label: saunaData.name, imgPath: url })
      );
      return <ImageStepper steps={images} />;
    }
  };

  render() {
    const { saunaData } = this.state;
    const { classes } = this.props;
    const { currentUser } = this.context;
    const currentUserId = currentUser && currentUser.uid;

    return (
      <div className="detailsContainer">
        <div className={classes.container}>
          <div className="saunaImage">
            {this.renderImages(saunaData.imageUrls)}
          </div>
          {currentUserId === saunaData.creatorId && (
            <Fab color="secondary" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          )}
        </div>
        <div className="details">
          <h2>{saunaData.name}</h2>
          <div className="ratings">
            <StarBorderIcon />
            <p>4.3</p>
            <AccessTimeIcon />
            <p>11:30-17:00</p>
          </div>
          <div>
            <span className="detailsSauna description">
              {saunaData.description}
            </span>
          </div>
          {/* TODO ratings */}
          <div className="ratings">
            <WavesIcon />
            <p>Swimming</p>
            <PaymentIcon />
            <p>Pay-In-app</p>
          </div>
          <div className="reviews">
            <h3>Reviews</h3>
            <Reviews />
          </div>

          <h3>Location</h3>
          <ListItem>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <span className="detailsSauna">
                    {saunaData.address && saunaData.address.inputAddress}
                  </span>
                </Typography>
              }
            />
          </ListItem>
        </div>

        <Map saunaPage predefinedPlace={saunaData} zoom={17} width="300px" />

        <div className="pay">
          <div className={classes.button}>
            <Link to="/pay">
              <Button variant="contained" color="primary">
                Pay for visit now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withFirebase(SaunaPage));
