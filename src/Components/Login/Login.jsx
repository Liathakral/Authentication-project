import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Login successful');
        console.log(data);
        // Store JWT token in localStorage or state
        localStorage.setItem('jwtToken', data.jwtToken);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input 
            type="text" 
            placeholder='Email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder='Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">LOGIN</button>
        {message && <p>{message}</p>}
        <div className="form-links">
          <a href="/forget-password">Forgot Password?</a>
          <a href="/">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
