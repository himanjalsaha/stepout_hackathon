import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router";
import CoachDashboard from './pages/CoachDashboard/index.jsx';

const App = () => {
  return (
    <BrowserRouter>
  <Routes>
      <Route path="/" element={<CoachDashboard />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
