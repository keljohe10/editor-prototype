import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from "./pages/Editor";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
