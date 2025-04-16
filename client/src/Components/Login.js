import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9009/api/user/login', { email, password }, { withCredentials: true });
      const token = res.data.success.token;
      localStorage.setItem('authToken', token);
      setMessage('Login successful!');
      window.location.href = "/";
    } catch (err) {
      setMessage('Login failed. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #2b2b2b, #1c1c1c)', // Dark gradient for gym vibes
      padding: '0 16px',
    },
    formContainer: {
      backgroundColor: '#2c2c2c', // Dark form background
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
    },
    heading: {
      fontSize: '2.25rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '30px',
      color: '#fff', // White text for contrast
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      paddingLeft: '40px',
      marginBottom: '15px',
      borderRadius: '15px',
      border: '1px solid #444', // Subtle border for dark theme
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      color: '#fff', // White text for inputs
      backgroundColor: '#444', // Dark input background
    },
    inputFocus: {
      borderColor: '#4e7ed9',
      boxShadow: '0 0 5px rgba(76, 110, 245, 0.5)',
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#888', // Subtle icon color
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(90deg, #4e7ed9 0%, #ff61a6 100%)',
      color: 'white',
      fontWeight: '600',
      borderRadius: '15px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: 'linear-gradient(90deg, #ff61a6 0%, #4e7ed9 100%)',
    },
    message: {
      marginTop: '20px',
      fontSize: '0.875rem',
      textAlign: 'center',
      color: '#ff5733', // Red color for error or success messages
    },
    signUpLink: {
      color: '#4e7ed9',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div style={styles.inputWrapper}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>
          <div style={styles.inputWrapper}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style = { ...styles.button, ...styles.buttonHover }}
            onMouseLeave={(e) => e.target.style = styles.button}
          >
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
}
