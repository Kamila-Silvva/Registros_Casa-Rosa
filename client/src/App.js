// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Record from './Record.js';
import './App.css';
import './Login.js';
import './Register.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Records" element={<Record />} />
          <Route path="/" element={<Login />} /> {/* Defina a página inicial */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
