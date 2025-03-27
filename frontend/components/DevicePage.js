// src/components/DevicePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SmartAssistant from './SmartAssistant';
import SmartCamera from './SmartCamera';
import SmartWatch from './SmartWatch';

const DevicePage = () => {
  const { deviceName } = useParams();

  switch (deviceName?.toLowerCase()) {
    case 'smartassistant':
      return <SmartAssistant />;
    // case 'smartcamera':
    //   return <SmartCamera />;
    case 'smartwatch':
      return <SmartWatch />;
    default:
      return <div style={{ color: 'white', padding: '20px' }}>Unknown device: {deviceName}</div>;
  }
};

export default DevicePage;
