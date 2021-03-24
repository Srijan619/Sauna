import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './map.css';
import CloseIcon from '@material-ui/icons/Close';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Grid, CircularProgress, Button, Box, Card } from '@material-ui/core';
import locationPin from '../../assets/images/current-location.svg';
import markerPin from '../../assets/images/marker-pin.svg';
import usePosition from '../../utils/hooks/UsePosition';
import {
  makeStyles,
} from '@material-ui/core/styles';

const Map = ({ onLoad, mapItems, saunaPage, predefinedPlace, zoom }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  });

  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Set lat lng values to user position
  const { lat, lng } = usePosition(true);

  // ... initial center on user position
  const [center, setCenter] = useState({ lat, lng });

  const options = {
    zoom: zoom || 14,
    disableDefaultUI: true
  };

  const markerClickHandler = (event, item) => {
    // Remember which place was clicked
    setSelectedPlace(item);

    // Set new center
    if (item) {
      setCenter({
        lat: parseFloat(item.address.lat),
        lng: parseFloat(item.address.lng)
      });
    }

    // Toggle info box
    if (!infoOpen) {
      setInfoOpen(!infoOpen);
    }
  };

  const iconLocation =
    window &&
    window.google &&
    new window.google.maps.MarkerImage(
      locationPin,
      null,
      null,
      null,
      new window.google.maps.Size(32, 32)
    );
  const iconMarker =
    window &&
    window.google &&
    new window.google.maps.MarkerImage(
      markerPin,
      null,
      null,
      null,
      new window.google.maps.Size(32, 32)
    );

  const renderMap = () => {

    return (
      <div>
        <div className={`map-wrapper ${saunaPage && `sauna-page`}`}>
          <GoogleMap
            options={options}
            onLoad={onLoad}
            center={center || { lat, lng }}
          >
            <Marker
              icon={iconLocation}
              position={{ lat, lng }}
              text="You are here"
            />
            {predefinedPlace && predefinedPlace.address && (
              <Marker
                icon={iconMarker}
                position={{
                  lat: parseFloat(predefinedPlace.address.lat),
                  lng: parseFloat(predefinedPlace.address.lng)
                }}
                text={predefinedPlace.name && predefinedPlace.name}
                onClick={event => markerClickHandler(event, predefinedPlace)}
              />
            )}
            {!predefinedPlace &&
              mapItems &&
              Object.entries(mapItems).map(([key, item]) => (
                <Marker
                  key={key}
             
                  icon={iconMarker}
                  position={{
                    lat: parseFloat(item.address.lat),
                    lng: parseFloat(item.address.lng)
                  }}
                  text={item.name && item.name}
                  onClick={event => markerClickHandler(event, item)}
                />
              ))}
            {!saunaPage && infoOpen && selectedPlace && (
              <Box
                background="white"
                position="absolute"
                bottom="50px"
                className="sauna-info-box"
              >
                <Card>
                  <div className="sauna-img-wrapper" />
                  <img className="sauna-img" src={selectedPlace.imageUrls[0]} />
                  <button
                    type="button"
                    onClick={() => setInfoOpen(!infoOpen)}
                    className="sauna-close-modal"
                  >
                    <CloseIcon />
                  </button>
                  <Grid
                    container
                    alignItems="center"
                    className="sauna-card-content"
                  >
                    <Grid item xs>
                      <h3 id="card-title" style={{ paddingLeft: 0 }}>
                        {selectedPlace.name && selectedPlace.name}
                      </h3>
                      <p id="card-description">
                        {selectedPlace.description && selectedPlace.description}
                      </p>
                    </Grid>
                    <Grid item>
                      <Link to={`/sauna/${selectedPlace.name}`}>
                        <Button variant="contained" color="primary">
                          View sauna
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            )}
          </GoogleMap>
        </div>
      </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <CircularProgress />;
};

export default Map;
