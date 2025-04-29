import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const { projectId } = useParams(); // Get taskId and projectId from URL
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({ title: '', description: '', status: '' });


  
//   useEffect(() => {
//     const fetchTaskDetails = async () => {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };
//       try {
//         const res = await axios.get(`http://localhost:4000/api/v1/project/${projectId}/task/${taskId}`, config);
//         setTaskData(res.data);
//       } catch (error) {
//         console.error('Error fetching task details:', error);
//       }
//     };

//     if (projectId && taskId) {
//       fetchTaskDetails();
//     } else {
//       console.error('Invalid projectId or taskId');
//     }
//   }, [projectId, taskId]);

  const updateTask = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Project ID:', projectId);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/project/${projectId}/updatetask`, // Ensure correct URL
        {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
        },
        config
      );
      console.log('Task updated:', res.data);
       alert("update")
     
      navigate(`/project/${projectId}/tasks`);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Task</h2>
      <form onSubmit={updateTask} className="space-y-4 mb-6">
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
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition duration-200"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
