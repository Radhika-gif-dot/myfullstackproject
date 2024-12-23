import React, { useState, useEffect } from 'react';
import { Check, Pen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskCard = ({ task, onTaskDeleted }) => {
  const [status, setStatus] = useState(task.status || '');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== task.status) {
      setIsConfirmed(false);
    }
  }, [status, task.status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirm = async () => {
    if (status === task.status) {
      return;
    }
    setIsLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem("authdata"));
      if (!authData) {
        throw new Error("User not logged in");
      }
      const response = await axios.put(
        `http://localhost:8080/tasks/status/${task._id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.access_token}`,
          },
        }
      );

      setIsConfirmed(true);
      console.log('Task status updated:', response.data);
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to update task status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true);
      try {
        const authData = JSON.parse(localStorage.getItem("authdata"));
        if (!authData) {
          throw new Error("User not logged in");
        }
        const response = await axios.delete(
          `http://localhost:8080/tasks/${task._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.access_token}`,
            },
          }
        );

        console.log('Task deleted successfully:', response.data);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error('Error deleting task:', error.message);
        alert('Failed to delete task. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-full mb-4">
      {/* Task Title and Description */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
        </div>

        {/* Edit and Delete Icons */}
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => navigate(`/tasks/${task._id}`)}
          >
            <Pen size={20} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Status Section */}
      <div className="mb-4">
        <div className="flex gap-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="To Do"
              checked={status === 'To Do'}
              onChange={handleStatusChange}
              className="form-radio"
            />
            <span>To Do</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="In Progress"
              checked={status === 'In Progress'}
              onChange={handleStatusChange}
              className="form-radio"
            />
            <span>In Progress</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Done"
              checked={status === 'Done'}
              onChange={handleStatusChange}
              className="form-radio"
            />
            <span>Done</span>
          </label>
        </div>

        <div className="flex items-center gap-x-5 mt-3">
          <h3 className="text-base text-freshbasil font-bold">
            Task Due On {new Date(task.dueDate).toLocaleDateString()}
          </h3>
          <button
            onClick={handleConfirm}
            className={`bg-freshbasil text-white px-4 py-1 rounded-md flex items-center active:bg-dustyrose gap-x-1 ${
              status === task.status ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || status === task.status}
          >
            {isLoading ? 'Updating...' : <Check />}
            Change
          </button>
        </div>
      </div>
      {isConfirmed && <p className="text-green-500 mt-2">Status updated successfully!</p>}
    </div>
  );
};

export default TaskCard;
