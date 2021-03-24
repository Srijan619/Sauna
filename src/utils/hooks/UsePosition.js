/**
 * Reusable hook for getting user location
 */
import { useState, useEffect } from 'react';

function usePosition() {
  const [position, setPosition] = useState({
    lat: 60.4495186,
    lng: 22.2576759
  });
  const [errors, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      lat: parseFloat(coords.latitude),
      lng: parseFloat(coords.longitude)
    });
  };

  const onError = error => {
    setError(error.message);
  };

  /* eslint-disable consistent-return */
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, errors };
}

export default usePosition;
