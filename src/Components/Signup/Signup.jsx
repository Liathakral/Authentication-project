import React,{useState} from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';

const presetRoles = ['Buyer', 'Tenant', 'Owner', 'User', 'Admin', 'Content Creator'];

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [name , setname ] = useState('');
    const [role, setRole] = useState(presetRoles[0]);
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('https://jwtauth-production-160c.up.railway.app/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email, password ,role}),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setMessage('Signup successful');
          console.log(data);
          
    
            // Store JWT token in localStorage or state
            localStorage.setItem('jwtToken', data.jwtToken);
            // Redirect to login page
            navigate('/login');
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
          <h2>Register</h2>
          <div className="form-group">
            <input 
              type="text" 
              placeholder='Name'
              value={name} 
              onChange={(e) => setname(e.target.value)} 
            />
          </div>
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
          <div className="form-group">
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        {presetRoles.map((presetRole) => (
                            <option key={presetRole} value={presetRole}>
                                {presetRole}
                            </option>
                        ))}
                    </select>
                </div>
          <button type="submit">Register</button>
          {message && <p>{message}</p>}
          <div className="form-links">

          <a href="/login">Already have an account ?login</a>
          </div>
        </form>
      </div>
    );
  }
  
export default Signup
