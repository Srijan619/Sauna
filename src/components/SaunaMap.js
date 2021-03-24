import React, { useState, useEffect } from 'react';
import Map from './Map';
import { withFirebase } from '../Firebase';

const SaunaMap = ({ firebase }) => {
  const { db } = firebase;
  const [data, setData] = useState([]);

  useEffect(() => {
    db.collection('saunas')
      .get()
      .then(snapshot => {
        const items = [];
        snapshot.forEach(doc => {
          items[doc.id] = doc.data();
        });
        setData(items);
      });
  }, [db]);

  return <Map mapItems={data && data} />;
};

export default withFirebase(SaunaMap);
