// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/courses" element={<CourseList />} /> 
        <Route path="/courses/:id" element={<CourseDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;



