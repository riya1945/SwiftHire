import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from "./Login"; 
import Home from "./Home";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./Analytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
      </Routes>
    </Router>
  );
}

export default App;
