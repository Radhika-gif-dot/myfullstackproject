import React, { useState } from 'react';
import axios from "axios";
const AddTask = ({closeModal, onTaskAdded}) => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const handleChange = (e) => {
      setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem("authdata"));
      if (!authData) {
        throw new Error("User not logged in");
      }

      const payload = {
        ...taskDetails,
        status: "To Do",
        dueDate: new Date(taskDetails.dueDate).toISOString(),
      };

      const response = await axios.post("http://localhost:8080/tasks", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      console.log("Task added successfully:", response.data);
      onTaskAdded(response.data);
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleReset = () => {
    closeModal();
  };
  return (
    <div className="p-4 border rounded-md shadow-md w-full mb-2 mt-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            name='title'
            value={taskDetails.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter task title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Task Description
          </label>
          <textarea
            id="description"
            name='description'
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
            type="date"
            name='dueDate'
            value={taskDetails.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex items-center gap-x-2 max-sm:flex-wrap'>
        <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 w-full"
          >
            Cancel
          </button>
        <button
          type="submit"
          className="w-full bg-freshbasil text-white py-2 px-4 rounded-md hover:bg-dustyrose"
        >
          Add Task
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
