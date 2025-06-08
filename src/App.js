import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from "./Login"; 
import Home from "./Home";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./Analytics";
import AiAssitant from "./AiAssitant";
import Profile from "./Profile";
import Form from "./Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/aiassitant" element ={<AiAssitant/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/form" element={<Form/>}/>

      </Routes>
    </Router>
  );
}

export default App;
