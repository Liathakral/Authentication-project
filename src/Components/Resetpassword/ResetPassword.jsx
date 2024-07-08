// src/Components/ResetPassword/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';

function Resetpassword() {
    const { token } = useParams();
    console.log(token); // Retrieve the token from URL parameters
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch(`https://jwtauth-production-160c.up.railway.app/auth/resetpassword/?${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
            setMessage('Password reset successful. You can now log in with your new password.');
        } else {
            setMessage('Error: ' + data.message);
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default Resetpassword;
