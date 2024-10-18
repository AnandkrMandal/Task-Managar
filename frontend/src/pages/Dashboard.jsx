import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTasktitle, setNewTasktilte] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);

  // Mark task as complete
  const markAsComplete = async (taskId) => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task marked as complete!");
      setShouldFetch((prev) => !prev);
    } catch (error) {
      toast.error("Failed to mark task as complete.");
    }
    setLoading(false);
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task deleted successfully!");
      setShouldFetch((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task", error);
      toast.error("Failed to delete task.");
    }
    setLoading(false);
  };

  // Edit task
  const editTask = async (taskId) => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/${taskId}`,
        { title: newTasktitle, description: editedTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task updated successfully!");
      setShouldFetch((prev) => !prev);
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task.");
    }
    setLoading(false);
  };

  // Create new task
  const createNewTask = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks`,
        { title: newTasktitle, description: newTaskDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task created successfully!");
      setShouldFetch((prev) => !prev);
      setShowNewTaskPopup(false);
      setNewTasktilte("");
      setNewTaskDescription("");
    } catch (error) {
      console.error("Error creating task", error);
      toast.error("Failed to create task.");
    }
    setLoading(false);
  };

  // Fetch task description
  const fetchDescription = async (taskId) => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDescription(response.data.data);
      setShowDescriptionPopup(true);
    } catch (error) {
      toast.error("Failed to fetch task description.");
    }
    setLoading(false);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setNewTasktilte(task.title);
    setEditedTask(task.description);
    setShowEditPopup(true);
    setMenuOpen(null);
  };

  const toggleMenu = (taskId) => {
    setMenuOpen(menuOpen === taskId ? null : taskId);
  };

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch tasks.");
      }
      setLoading(false);
    };
    fetchTasks();
  }, [shouldFetch]);

  return (
    <div className="m-6">
      <div className="flex justify-end mb-4 lg:mr-20">
        {/* New Task Button */}
        <button
          className="lg:px-20 py-3 px-8 flex flex-row bg-gray-800 text-white rounded-md hover:bg-gray-950"
          onClick={() => setShowNewTaskPopup(true)}
        >
          Add New Task
          <img className="ml-2 " width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png" alt="plus-math--v1"/>
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <AiOutlineLoading3Quarters className="text-black text-5xl animate-spin" />
          </div>
        )}

        {/* No Tasks Found */}
        {tasks.length === 0 && !loading && (
          <div className=" flex text-center w-full mt-8">
            <p className="text-xl font-mono  font-semibold">
              No tasks found. Create a new task now!
            </p>
          </div>
        )}

        {/* Task List */}
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`lg:px-10 px-6 lg:py-8 py-5 border-1 ${
              task.completed ? " bg-green-400" : "bg-white"
            } border-gray-200 rounded-lg font-serif shadow-lg mb-4 relative`}
          >
            <div className="flex justify-between">
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                {task.title}
              </p>
              <div className="relative">
                {/* Three-dot Menu */}
                <button
                  onClick={() => toggleMenu(task._id)}
                  className="font-bold"
                >
                  ...
                </button>
                {menuOpen === task._id && (
                  <div className="absolute mt-2 right-0 w-48 bg-slate-50 border rounded shadow-md z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      onClick={() => markAsComplete(task._id)}
                      disabled={task.completed}
                    >
                      Mark as Complete
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="font-normal text-gray-700 mt-4 mb-6">
              {task.description.slice(0, 150)}...
            </p>

            <div className="absolute bottom-4 right-4">
              <button
                className="inline-flex mt-5 px-3 py-2 text-black bg-yellow-400 rounded-lg hover:bg-yellow-500"
                onClick={() => fetchDescription(task._id)}
              >
                Read Description
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Description Pop-up */}
      {showDescriptionPopup && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="mt-4 max-w-6xl text-xl font-bold">
              {description.title}
            </p>
            <p className="mt-4 max-w-6xl">{description.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setShowDescriptionPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Pop-up */}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">Edit Task</h2>
            <input
              value={newTasktitle}
              onChange={(e) => setNewTasktilte(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
            />
            <textarea
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
            ></textarea>
            <button
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded"
              onClick={() => editTask(selectedTask._id)}
            >
              Save
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-200 text-black rounded"
              onClick={() => setShowEditPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* New Task Pop-up */}
      {showNewTaskPopup && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">New Task</h2>
            <input
              value={newTasktitle}
              onChange={(e) => setNewTasktilte(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
              placeholder="Task Title"
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
              placeholder="Task Description"
            ></textarea>
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
              onClick={createNewTask}
            >
              Create
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-200 text-black rounded"
              onClick={() => setShowNewTaskPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
