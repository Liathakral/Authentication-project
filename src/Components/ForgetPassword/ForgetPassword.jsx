// src/ForgetPassword.js
import React, { useState } from 'react';
import './Forgetpass.css';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email:', email);

        const response = await fetch('http://localhost:3000/auth/forgetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
            setMessage('Please check your email for the password reset link.');
        } else {
            setMessage('Error: ' + data.message);
        }
    };

    return (
        <div className="forget-password-container">
            <form className="forget-password-form" onSubmit={handleSubmit}>
                <h2>Forget Password</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button  type="submit">Submit</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default ForgetPassword;
