import React, { useState } from 'react';
import { Check, Pen, Trash2 } from 'lucide-react'; // Icons for edit and delete
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const TaskCard = ({ task }) => {
  const [status, setStatus] = useState('To Do'); // Default status is "To Do"
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setIsConfirmed(false); // Reset confirmation on status change
      };
    
      // Function to update the task status
      const handleConfirm = async () => {
        setIsLoading(true);
        try {
          const authData = JSON.parse(localStorage.getItem("authdata"));
          if (!authData) {
            throw new Error("User not logged in");
          }
    
          // Send the updated status to the backend
          const response = await axios.put(
            `http://localhost:8080/tasks/status/${task.id}`, // Use the task ID to target the task
            { status },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData.access_token}`,
              },
            }
          );
          
          setIsConfirmed(true); // Status updated successfully
          console.log('Task status updated:', response.data);
        } catch (error) {
          console.error('Error updating task:', error.message);
        } finally {
          setIsLoading(false);
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
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
          {/* onClick={() => onUpdate(task.id)}  */}
            <Pen size={20} />
          </button>
          <button 
          className="text-red-500 hover:text-red-700">
          {/* onClick={() => onDelete(task.id)}  */}
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

        <div className='flex items-center gap-x-5 mt-3'>
        <h3 className="text-base text-freshbasil font-bold">Task Due On {new Date(task.dueDate).toLocaleDateString()}</h3>
          <button
            onClick={handleConfirm}
            className="bg-freshbasil text-white px-4 py-1 rounded-md flex items-center active:bg-dustyrose gap-x-1"
            disabled = {true}
          >
            {isLoading ? 'Updating...' : <Check />}
            Change
          </button>
          </div>
      </div>
    </div>
  );
};

export default TaskCard;
