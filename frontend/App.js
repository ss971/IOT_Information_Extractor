// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IoTExtractor from './components/IoTExtractor';
import DevicePage from './components/DevicePage';
import LoginPage from './components/LoginPage'
import CaseInfo from './components/CaseInformation'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/caseinfo" element={<CaseInfo />} />
      <Route path="/iotextractor" element={<IoTExtractor />} />
      <Route path="/:deviceName" element={<DevicePage />} />
    </Routes>
  </Router>
);

export default App;