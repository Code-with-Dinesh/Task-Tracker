import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/login', formData);
      console.log(res)
      localStorage.setItem('token', res.data.data);
      
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form 
    onSubmit={handleSubmit} 
    className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
  >
    <input 
      name="email" 
      placeholder="Email" 
      onChange={handleChange} 
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    <input 
      name="password" 
      placeholder="Password" 
      type="password" 
      onChange={handleChange} 
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    <button 
      type="submit" 
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
    >
      Login
    </button>
  </form>
  
  );
}

export default Login;