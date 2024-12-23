import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("authdata"));
      if (!authData) {
        navigate("/");
        throw new Error("User not logged in");
      }
        const response = await axios.get("http://localhost:8080/tasks", {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        });
        setTasks(response.data); 
        const task = response.data.find((task) => task._id === id);
        if (task) {
          setTaskDetails({
            title: task.title,
            description: task.description,
            dueDate: new Date(task.dueDate).toISOString().split('T')[0],
            status: task.status,
          });
        } else {
          navigate('/todos'); 
        }
      } catch (error) {
        console.error('Error loading tasks:', error.message);
        navigate('/todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [id, navigate]);

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const authData = JSON.parse(localStorage.getItem("authdata"));
      if (!authData) {
        throw new Error("User not logged in");
      }

      await axios.put(
        `http://localhost:8080/tasks/${id}`,
        {
          title: taskDetails.title,
          description: taskDetails.description,
          dueDate: taskDetails.dueDate,
          status: taskDetails.status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${authData.access_token}`
          },
        }
      );

      alert('Task updated successfully');
      navigate('/todos'); 
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/todos'); 
  };

  if (isLoading) {
    return <div>Loading task details...</div>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md max-w-7xl mx-auto max-md:mx-1 mb-2 mt-2">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={taskDetails.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter task description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Task Due Date */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={taskDetails.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Task Status */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Task Status
          </label>
          <select
            id="status"
            name="status"
            value={taskDetails.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-x-4 w-full">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-dustyrose text-white py-2 px-4 rounded-md hover:bg-freshbasil"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
