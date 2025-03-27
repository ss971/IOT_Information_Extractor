import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatrixBackground, TeamInfo } from './Layout';
import { motion } from 'framer-motion';
import { 
  containerStyle,
  pageContentStyle,
  fancyHeadingStyle,
  spinnerStyle
} from '../constants/styles';

const SmartWatch = () => {
  const [loading, setLoading] = useState(true);
  const [teamText, setTeamText] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const teamInfo = "Team Name: paidRTOS\nTeam Members:\n\t1. Shambo Sarkar\n\t2. Sathvik S\n\t3. Sherwin Allen\n\t4. Meeran Ahmed";

  // Typing animation for team info
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTeamText(teamInfo.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= teamInfo.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Function to acquire data and trigger a file download.
  // Sends source=SmartWatch as query parameter.
  const handleAcquireData = async () => {
    setDownloading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({ source: 'SmartWatch' });
      const response = await fetch(`http://localhost:5000/api/packet-report?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Forensic_Log_Report.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error acquiring data:", err);
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  };

  // Button style (neon theme)
  const bigButtonStyle = {
    width: '80%',
    padding: '20px',
    backgroundColor: '#0f0', // neon green
    border: 'none',
    color: '#000',
    cursor: 'pointer',
    fontSize: '1.5rem',
    borderRadius: '10px',
    margin: '20px auto',
    display: 'block',
    fontFamily: "'Orbitron', sans-serif",
    textTransform: 'uppercase',
    boxShadow: '0 0 20px rgba(0,255,0,0.7)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  };

  const bigButtonHover = {
    scale: 1.1,
    boxShadow: '0 0 30px rgba(0,255,0,1)'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <MatrixBackground />
        <TeamInfo teamText={teamText} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 24 }}>
            INITIALIZING SMART WATCH...
          </p>
          <div style={spinnerStyle} />
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <MatrixBackground />
      <TeamInfo teamText={teamText} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={pageContentStyle}>
        <h1 style={{ ...fancyHeadingStyle, fontSize: '2.5rem', marginBottom: '48px' }}>
          SMART WATCH DATA
        </h1>

        {error && (
          <p style={{ color: 'red', fontSize: '1.2rem', textAlign: 'center' }}>{error}</p>
        )}

        <motion.button 
          onClick={handleAcquireData}
          style={bigButtonStyle}
          whileHover={bigButtonHover}
          disabled={downloading}
        >
          {downloading ? 'Acquiring Data...' : 'Acquire Data'}
        </motion.button>

        <motion.button 
          onClick={() => navigate('/iotextractor')}
          style={bigButtonStyle}
          whileHover={bigButtonHover}
        >
          Back to Devices
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SmartWatch;
