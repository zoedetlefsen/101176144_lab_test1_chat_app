import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state here

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when login process starts

    try {
      const { data } = await axios.post('/login', { username, password });
      if (data.error) {
        console.log(data.error);
        // Optionally, handle login error (e.g., wrong credentials) here
      } else {
        // Assuming your backend correctly handles login and sets up session/cookie
        setUsername('');
        setPassword('');
        navigate('/chat-room'); // Navigate to chat-room or desired route on success
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false when login process ends
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className='center-container'>
        <div>
          <form onSubmit={loginUser}>
              <label>Username:</label>
              <input 
                type="text" 
                placeholder='username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
              <label>Password:</label>
              <input 
                type="password" 
                placeholder='Enter Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
