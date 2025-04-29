import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectDetails() {
    const navigate = useNavigate()
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({ title: '', description: '', status: '' });

  const fetchTasks = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const res = await axios.get(`http://localhost:4000/api/v1/project/${projectId}/read`,config);
    setTasks(res.data);
  };

  const addTask = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    await axios.post(`http://localhost:4000/api/v1/project/${projectId}/task`, taskData,config);
    setTaskData({ title: '', description: '', status: '' });
    fetchTasks();
  };



  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      // Make sure the URL includes the correct projectId
      const res = await axios.delete(
        `http://localhost:4000/api/v1/project/${id}/deletetask`, // Correct URL
        
        config
      );
      console.log("deletask:", res.data);
      fetchTasks();  // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const updateTask2 = (taskId) => {
    // Navigate to the update page with the task ID
    navigate(`/project/${taskId}/updatetask`);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h2>

  <div className="space-y-4 mb-6">
    <input
      name="title"
      placeholder="Title"
      value={taskData.title}
      onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      name="description"
      placeholder="Description"
      value={taskData.description}
      onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      name="status"
      placeholder="Status"
      value={taskData.status}
      onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={addTask}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition duration-200"
    >
      Add Task
    </button>
  </div>

  <ul className="space-y-4">
    {tasks.map((task) => (
      <li key={task._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
        <div>
          <p className="font-medium text-lg text-gray-700">{task.title}</p>
          <p className="text-sm text-gray-500">{task.description}</p>
          <p className="text-xs text-gray-400">{task.status}</p>
        </div>
        <div className="space-x-2">
          <button
            
            onClick={() => updateTask2(task._id)}
            
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Update
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default ProjectDetails;
