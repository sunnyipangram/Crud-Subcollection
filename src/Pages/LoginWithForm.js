import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';

import '../Css/Login.css'; // Import your CSS file for styles
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';

const LoginForm = () => {

    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth,email, password);
      alert('Login successful!');
      navigate('/')
      
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <Link to={'/'}>Don't have account?</Link><br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
