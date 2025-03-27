import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MatrixBackground } from './Layout';
import { 
  containerStyle,
  pageContentStyle,
  fancyHeadingStyle
} from '../constants/styles';

// Default case details (editable fields)
const defaultCase = {
  caseNumber: "Case #007",
  caseType: "Burglary",
  caseDescription: "High End Apartment simple break-in and break-out. One of the family members witnessed the robbery and got injured in the process. Smart Assistant was present at the crime scene."
};

const CaseInformation = () => {
  // Maintain an array of cases; each case will render as 3 editable bubbles.
  const [cases, setCases] = useState([defaultCase]);

  // Update a field of a specific case
  const updateCase = (index, field, value) => {
    const updatedCases = [...cases];
    updatedCases[index] = { ...updatedCases[index], [field]: value };
    setCases(updatedCases);
  };

  // Add a new case with default values (creating a new object to avoid reference issues)
  const addCase = () => {
    setCases([...cases, { ...defaultCase }]);
  };

  // Styling for the individual bubbles
  const boxStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 255, 0, 0.5)',
    textAlign: 'center',
    color: '#0f0',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.2rem',
    width: '300px',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Styling for buttons
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#0f0',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
    marginTop: '40px'
  };

  const addCaseButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
    color: '#fff',
    marginRight: '20px'
  };

  // Container for each case's bubbles
  const caseContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  // Input styles
  const inputStyle = {
    background: 'transparent',
    border: 'none',
    textAlign: 'center',
    color: '#0f0',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.2rem',
    width: '100%'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'none'
  };

  return (
    <div style={containerStyle}>
      <MatrixBackground />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={pageContentStyle}
      >
        <h1 style={{ ...fancyHeadingStyle, fontSize: '2.5rem', marginBottom: '20px' }}>
          Case Information
        </h1>
        <div>
          {cases.map((caseItem, index) => (
            <div key={index} style={caseContainerStyle}>
              <motion.div 
                style={boxStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  style={inputStyle}
                  value={caseItem.caseNumber}
                  onChange={(e) => updateCase(index, 'caseNumber', e.target.value)}
                />
              </motion.div>
              <motion.div 
                style={boxStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  style={inputStyle}
                  value={caseItem.caseType}
                  onChange={(e) => updateCase(index, 'caseType', e.target.value)}
                />
              </motion.div>
              <motion.div 
                style={boxStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <textarea
                  style={textareaStyle}
                  value={caseItem.caseDescription}
                  onChange={(e) => updateCase(index, 'caseDescription', e.target.value)}
                />
              </motion.div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={addCaseButtonStyle} onClick={addCase}>
            Add a Case
          </button>
          <Link to="/iotextractor" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>
              Go to Devices
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseInformation;
