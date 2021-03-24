/* eslint-disable import/prefer-default-export */
import Geocode from 'react-geocode';

/**
 * Utils to be used across app
 */

// Pass in your object structure as array elements, e.g. getNestedObject(item, ['details']['name'])
export const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

export const initGeocode = () => {
  Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
  Geocode.setRegion('fi');

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();
};

// Get address from latitude & longitude
export const getAddressFromLatLng = (lat, lng) => {
  initGeocode();

  Geocode.fromLatLng(lat, lng).then(
    response => {
      const address = response.results[0].formatted_address;
      return address;
    },
    error => {
      console.error(error);
    }
  );
};

// Get address from latidude & longitude.
export const getGeocodeFromAddress = address => {
  initGeocode();
  console.log(address);
  // Get latidude & longitude from address.
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    error => {
      console.error(error);
    }
  );
};
