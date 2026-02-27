import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import HRDashboard from './pages/HRDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* public landing page with modal login */}
        <Route path="/" element={<Home />} />
        {/* app routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
