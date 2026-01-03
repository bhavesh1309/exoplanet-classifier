import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from './Home';
import ClassifyPage from './Predict';

// ==================== MAIN APP ==================== 
export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<ClassifyPage />} />
        </Routes>
      </div>
    </Router>
  );
}