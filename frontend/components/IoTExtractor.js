import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MatrixBackground, TeamInfo } from './Layout';
import { 
  containerStyle,
  pageContentStyle,
  imageContainerStyle,
  gridStyle,
  cardStyle,
  fancyHeadingStyle
} from '../constants/styles';

const devices = [
  { 
    name: 'Smart Assistant', 
    image: 'https://img.freepik.com/premium-photo/voice-assistant-device-stands-illuminated-against-dark-background-artificial-intelligence-assistance_308548-6446.jpg'
  },
  // { 
  //   name: 'Smart Camera', 
  //   image: 'https://img.freepik.com/premium-photo/ip-camera-placed-black-background_150418-645.jpg'
  // },
  { 
    name: 'Smart Watch', 
    image: 'https://www.theproche.com/wp-content/uploads/2021/03/smart-watch.png'
  },
];

const IoTExtractor = () => {
  const [teamText, setTeamText] = useState('');
  const teamInfo = "Team Name: paidRTOS\nTeam Members:\n\t1. Shambo Sarkar\n\t2. Sathvik S\n\t3. Sherwin Allen\n\t4. Meeran Ahmed";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTeamText(prev => teamInfo.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= teamInfo.length) clearInterval(typingInterval);
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div style={containerStyle}>
      <MatrixBackground />
      <TeamInfo teamText={teamText} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={pageContentStyle}>
        <h1 style={{ 
          ...fancyHeadingStyle, 
          fontSize: '2.5rem', 
          marginBottom: '48px',
          fontWeight: 700, // Added explicit font weight
          letterSpacing: '2px' // Added letter spacing
        }}>
          IoT Forensic Data Extraction
        </h1>
        <div style={gridStyle}>
          {devices.map((device, index) => {
            const route = `/${device.name.replace(/\s+/g, '').toLowerCase()}`;
            return (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={route} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    ...cardStyle,
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    padding: 0
                  }}>
                    <div style={imageContainerStyle}>
                      <img 
                        src={device.image} 
                        alt={device.name} 
                        style={{ 
                          display: 'block', 
                          margin: '0 auto', 
                          height: 200,
                          mixBlendMode: 'screen',
                          width: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <p style={{ 
                        textAlign: 'center', 
                        margin: 0,
                        padding: '0px 10px 10px', // top: 0, right/left: 10px, bottom: 10px
                        color: '#0f0',
                        fontSize: '1.3rem',
                        fontFamily: "'Orbitron', sans-serif",
                        textShadow: '0 0 12px #0f0',
                        letterSpacing: '3px',
                        fontWeight: 500,
                        background: 'linear-gradient(45deg, #0f0, #0a0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                        }}>
                        {device.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Back to Cases Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/caseinfo" style={{ textDecoration: 'none' }}>
            <button 
              style={{
                padding: '12px 24px',
                backgroundColor: '#007BFF',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem',
                borderRadius: '4px'
              }}
            >
              Back to Cases
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default IoTExtractor;
