import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router";
import PlayerDashboard from './pages/PlayerDashboard/index.jsx';
import CoachDashboard from './pages/CoachDashboard/index.jsx';


const App = () => {
  return (
    <BrowserRouter>
  <Routes>
      <Route path="/" element={<CoachDashboard/>} />
      <Route path="/player-dashboard" element={<PlayerDashboard />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
