import React, {  Component } from 'react';
import { TextField, Button, CircularProgress, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { compose } from 'recompose';
import { AuthContext } from '../Auth/Auth';
import { withFirebase } from '../../Firebase';
import Fab from '@material-ui/core/Fab';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = theme => ({
  root:{    
    maxWidth:'500px',
    paddingBottom:theme.spacing(10),
    overflow:'hidden',
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      fontFamily: 'Roboto',
      flexDirection: 'column',
      }},
 form:{
   display:'flex',
   flexDirection: 'column',
   justifyContent:'center',
   alignItems:'center',
   position:'relative'
 },
  image: {
    maxHeight: '300px',
    maxWidth:'96%'
  },
    fab: {
    position:'absolute',
      top: theme.spacing(0),
      zIndex: 99999
  },
});

class CreateSauna extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      creatorId: '',
      name: '',
      description: '',
      address: '',
      isValid: true,
      imageFile: '',
      imgUrl: '',
      processing: false,
      submitted: false,
      uploadedImages: []
    };
  }

  updateInput = e => {
    if (!e.target.validity.valid) {
      this.setState({
        isValid: false
      });
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageFile = e => {
    const image = e.target.files[0];
    this.setState({ imageFile: image });
  };

  onSubmitImages = e => {
    const { imageFile, uploadedImages, imgUrl } = this.state;
    const { firebase } = this.props;
    const { storage } = firebase;
    const promises = [];

    e.preventDefault();

    // TODO add metadata
    const metadata = {
      contentType: 'image/jpeg'
    };

    const uploadTask = storage
      .ref(`/saunaImages/${imageFile.name}`)
      .put(imageFile, metadata);
    promises.push(uploadTask);
    // initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      snapshot => {
        this.setState({ processing: true });
      },
      err => {
        // catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref('saunaImages')
          .child(imageFile.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.setState({
              processing: false,
              uploadedImages: [...uploadedImages, fireBaseUrl]
            });
          });
      }
    );
  };

  componentWillMount() {
    const { currentUser } = this.context;

    this.setState({
      creatorId: currentUser.uid
    });
  }

  onSubmit = e => {
    const {
      creatorId,
      name,
      description,
      address,
      uploadedImages
    } = this.state;
    const { firebase } = this.props;
    const { db } = firebase;

    e.preventDefault();

    const encodedParams = encodeURIComponent(address);
    fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${encodedParams}&format=json`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        db.collection('saunas')
          .doc(name)
          .set({
            creatorId,
            name,
            description,
            // TODO fallback if address not found!!
            address: {
              inputAddress: address,
              lat: data[1].lat,
              lng: data[1].lon
            },
            imageUrls: uploadedImages
          })
          .then(this.setState({ submitted: true }))
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });
      });
  };

  static contextType = AuthContext;

  render() {
    const { processing, isValid, submitted, uploadedImages, imageFile } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {uploadedImages &&
          uploadedImages.map((item, index) => (
            <img key={index} src={item} className={classes.image} />
          ))}
        {/* // TODO Validate form */}
        
        <form className={classes.imageForm} onSubmit={this.onSubmitImages}>
          {imageFile && (
            <Button type="submit" color="primary">
              Upload image
            </Button>
          )}
          {processing && <CircularProgress size={24} />}
        </form>
        <input type="file" id="file" ref="fileUploader" style={{display: "none"}} onChange={this.handleImageFile.bind(this)}/>
            <Fab color="primary"  aria-label="edit" className={classes.fab} >
          
          <AddAPhotoIcon onClick={()=>{this.refs.fileUploader.click()}} />
        </Fab>

        <form className={classes.form} onSubmit={this.onSubmit}>
        <h1 style={{ fontFamily: 'Lobster', marginBottom: 20 }}>Add a Sauna</h1>
          <div>
            <TextField
              label="Name"
              name="name"
              onChange={this.updateInput}
              required
            />
          </div>
          <div>
            <TextField
              name="description"
              label="Short description"
              multiline
              onChange={this.updateInput}
            />
          </div>
          <div>
            <TextField
              name="address"
              label="Address"
              onChange={this.updateInput}
              required
            />
          </div>
          <Button type="submit" color="primary" disabled={uploadedImages.length === 0}>
            Submit
          </Button>
          {submitted && <DoneIcon />}
        </form>

      </div>
    );
  }
}

export default compose(withFirebase, withStyles(useStyles))(CreateSauna);
