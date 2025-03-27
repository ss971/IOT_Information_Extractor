export const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
    overflow: 'hidden',
    fontFamily: "'Orbitron', sans-serif"
  };
  
  export const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  
  export const pageContentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: 16,
    textAlign: 'center'
  };
  
  export const imageContainerStyle = {
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    padding: 12
  };
  
  export const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 32,
    maxWidth: 900,
    margin: '0 auto'
  };
  
  export const cardStyle = {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255,255,255,0.2)'
  };
  
  export const spinnerStyle = {
    width: 80,
    height: 80,
    border: '6px solid #ccc',
    borderTop: '6px solid #007BFF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };
  
  export const fancyHeadingStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: '0 0 15px #0ff',
    fontSize: '2.5rem',
    marginBottom: '2rem'
  };
  
  export const teamInfoStyle = {
    position: 'fixed',
    bottom: 30,
    left: 30,
    backgroundColor: 'rgba(0, 30, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '2px solid #0f0',
    padding: '24px',
    borderRadius: '12px',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.1rem',
    color: '#0f0',
    textShadow: '0 0 8px #0f0',
    lineHeight: '1.6',
    boxShadow: '0 0 15px #0f0',
    zIndex: 2
  };