// // src/components/SmartCamera.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MatrixBackground, TeamInfo } from './Layout';
// import { motion } from 'framer-motion';
// import { 
//   containerStyle,
//   pageContentStyle,
//   fancyHeadingStyle,
//   spinnerStyle
// } from '../constants/styles';

// const SmartCamera = () => {
//   const [loading, setLoading] = useState(true);
//   const [teamText, setTeamText] = useState('');
//   const navigate = useNavigate();

//   const teamInfo = "Team Name: paidRTOS\nTeam Members:\n\t1. Shambo Sarkar\n\t2. Sathvik S\n\t3. Sherwin Allen\n\t4. Meeran Ahmed";

//   // Typing animation
//   useEffect(() => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       setTeamText(teamInfo.slice(0, currentIndex + 1));
//       currentIndex++;
//       if (currentIndex >= teamInfo.length) clearInterval(typingInterval);
//     }, 100);

//     return () => clearInterval(typingInterval);
//   }, []);

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div style={containerStyle}>
//         <MatrixBackground />
//         <TeamInfo teamText={teamText} />
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//           <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 24 }}>
//             INITIALIZING SMART CAMERA...
//           </p>
//           <div style={spinnerStyle} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={containerStyle}>
//       <MatrixBackground />
//       <TeamInfo teamText={teamText} />
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={pageContentStyle}>
//         <h1 style={{ ...fancyHeadingStyle, fontSize: '2.5rem', marginBottom: '48px' }}>
//           SMART CAMERA DATA
//         </h1>
//         <div style={{ margin: '2rem', padding: '2rem', border: '2px solid #0f0', borderRadius: '8px' }}>
//           <h2 style={{ color: '#0f0', marginBottom: '1rem' }}>Extracted Data:</h2>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li style={{ margin: '0.5rem 0' }}>📁 Recorded Footage</li>
//             <li style={{ margin: '0.5rem 0' }}>📁 Motion Detection Logs</li>
//             <li style={{ margin: '0.5rem 0' }}>📁 Connected Users</li>
//           </ul>
//         </div>

//         <button 
//           onClick={() => navigate('/')}
//           style={{ 
//             marginTop: 16, 
//             padding: '12px 24px',
//             backgroundColor: '#007BFF', 
//             border: 'none', 
//             color: 'white', 
//             cursor: 'pointer',
//             fontSize: '1.2rem'
//           }}>
//           BACK TO DEVICES
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default SmartCamera;
