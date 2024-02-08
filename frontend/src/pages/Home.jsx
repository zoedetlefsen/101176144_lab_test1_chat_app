import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  // Hook for navigation
  let navigate = useNavigate();

  return (
    <div>
        <h1>Welcome to Zoe's Chat App! 101176144</h1>
        <form>
            <button type="button" onClick={() => navigate('/login')}>Login</button>
            <button type="button" onClick={() => navigate('/register')}>Register</button>
        </form>
    </div>
  );
}
