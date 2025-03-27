import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MatrixBackground } from './Layout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login action here (e.g., API call, authentication, etc.)
    console.log('Logging in with:', username, password);
    // On successful login, redirect to the IoTExtractor page
    navigate('/caseinfo'); 
  };

  // Container for the entire page
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Login box styling with a neon glow and transparency
  const loginContainerStyle = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 255, 0, 0.5)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  };

  // Fancy heading style for a cyber look
  const fancyHeadingStyle = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    color: '#0f0',
    marginBottom: '20px',
    textShadow: '0 0 10px #0f0',
  };

  // Container to group input fields and the button symmetrically
  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
  };

  // Input fields styling
  const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    borderRadius: '4px',
    border: '1px solid #0f0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#0f0',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  // Button styling with a neon green background
  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0f0',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
  };

  return (
    <div style={containerStyle}>
      <MatrixBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={loginContainerStyle}
      >
        <h1 style={fancyHeadingStyle}>Login</h1>
        <form onSubmit={handleLogin} style={formGroupStyle}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
