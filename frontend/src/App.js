import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import GroupChat from './pages/GroupChat';
//import { AuthProvider } from './context/AuthContext'; this and user context having errors 

axios.defaults.baseURL = 'http://localhost:4000'; // Backend/server URL 
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat-rooms" element={<GroupChat />} />
      </Routes>
      </Router>
  );
}

export default App;
