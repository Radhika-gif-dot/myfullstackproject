import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TasksToDo() {
  const [isLoading, setLoading] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchTasks = async () => {
    setLoading(true);
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
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]); 
    setShowAddTaskModal(false); 
  };
  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));  // Remove deleted task from state
  };
  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col justify-between items-center h-14 py-1 mt-5">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-2xl text-freshbasil font-bold">TO-DO List</h3>
        <button
          type="button"
          className="bg-dustyrose text-white px-4 py-2 rounded-lg active:bg-freshbasil flex items-center gap-x-2"
          onClick={() => setShowAddTaskModal(!showAddTaskModal)}
        >
          <Plus /> {""}Add Task
        </button>
      </div>
      {showAddTaskModal && (
        <AddTask
          closeModal={() => setShowAddTaskModal(false)}
          onTaskAdded={handleTaskAdded}
        />
      )}
      <div className="flex flex-col gap-y-1 w-full  rounded-sm mt-3">
      {isLoading ? (
          <div className="text-center">Loading tasks...</div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard task={task} key={task._id} onTaskDeleted={handleTaskDeleted} />
          ))        
        ) : (
          <div className="text-center">No tasks available</div>
        )}
      </div>
    </div>
  );
}

export default TasksToDo;
