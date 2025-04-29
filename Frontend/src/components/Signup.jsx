import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/v1/signup', user);
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <form 
  onSubmit={handleSubmit} 
  className="max-w-md mx-auto p-6  bg-gray-400 shadow-md rounded-lg space-y-4"
>
  <input 
    placeholder="Name" 
    onChange={(e) => setUser({ ...user, name: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input 
    placeholder="Email" 
    onChange={(e) => setUser({ ...user, email: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input 
    type="password" 
    placeholder="Password" 
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input 
    placeholder="Country" 
    onChange={(e) => setUser({ ...user, country: e.target.value })}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button 
    type="submit" 
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
  >
    Signup
  </button>
</form>

  );
}
