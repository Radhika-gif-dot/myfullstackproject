import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams(); // Fetch ID from URL params
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch task details by ID
    const loadTask = async () => {
      try {
        // 
    } catch (error) {
        navigate('/todos'); // Redirect to tasks page if task not found
    }finally{
        setIsLoading(false);
    }
    };
    loadTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/todos'); // Redirect back to tasks page
  };

  const handleCancel = () => {
    navigate('/todos'); // Cancel and go back
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
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
