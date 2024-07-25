import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Editor from "./pages/Editor";
import Dashboard from "./pages/Dashboard";
import TipTap from "./pages/TipTap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tiptap" element={<TipTap />} />
      </Routes>
    </Router>
  );
}

export default App;
