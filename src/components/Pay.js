import React from 'react';
import { Box } from '@material-ui/core';
import qrcode from '../assets/img/qrcode.png';

const Pay = () => {
  return (
    <Box padding={10} textAlign="center" fontFamily="Roboto">
      <Box>Scan QR code:</Box>
      <img src={qrcode} />
      <h2>129503</h2>
    </Box>
  );
};

export default Pay;
