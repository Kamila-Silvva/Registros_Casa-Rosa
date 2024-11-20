// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Record from './components/Record';
import './App.css';
import './login.js';
import './register.js';
import './records.js'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/records" element={<Record />} />
          <Route path="/" element={<Login />} /> {/* Defina a página inicial */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
