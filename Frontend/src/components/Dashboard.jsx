import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const createProject = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/add',
        { name:title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setProjects([...projects, res.data]);
      setTitle('');
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err.message);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Your Projects</h2>

  <div className="flex flex-col sm:flex-row gap-3 mb-5">
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Project Title"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={createProject}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
    >
      Create Project
    </button>
  </div>

  <ul className="space-y-2">
    {projects.map((p) => (
      <li
        key={p._id}
        onClick={() => navigate(`/project/${p._id}`)}
        className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        {p.name}
      </li>
    ))}
  </ul>
</div>

  );
}

export default Dashboard;
