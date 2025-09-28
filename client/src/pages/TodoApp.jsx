import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Todo = () => {
  const { backendUrl } = useContext(AppContext);

  // --- State Management ---
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Configure Axios for cookies globally
  axios.defaults.withCredentials = true;

  // --- Helper Functions ---
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setCompleted(false);
  };

  // --- API Handlers ---
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/todos`);

      if (data.success) {
        // Fallback for different backend response structures (data.todos or data.data)
        setTodos(data.todos || data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch todos");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized. Please login.");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title cannot be empty");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/todos/create`,
        { title, description },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Todo added successfully.");
        resetForm();
        fetchTodos();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized. Please login.");
    }
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title cannot be empty");
    if (!editingId) return;

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/todos/${editingId}`,
        { title, description, completed },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Todo updated successfully.");
        resetForm();
        fetchTodos();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized. Please login.");
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      const { data } = await axios.delete(`${backendUrl}/api/todos/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Todo deleted.");
        fetchTodos();
        if (editingId === id) resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized. Please login.");
    }
  };

  const toggleComplete = async (id, currentCompletedStatus) => {
    if (editingId === id) return;

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/todos/${id}`,
        { completed: !currentCompletedStatus },
        { withCredentials: true }
      );

      if (data.success) {
        fetchTodos();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized. Please login.");
    }
  };

  // Function to load the todo data into the form for editing
  const startEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setEditingId(todo._id);
    setCompleted(todo.completed);
    document.getElementById("todo-form").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen mt-15">
        <h1 className="text-3xl font-bold text-gray-800 text-center py-6 border-b border-gray-200 mb-8">
          Todo Application
        </h1>

        {/* Todo Form (Add/Edit) */}
        <form
          id="todo-form"
          onSubmit={editingId ? updateTodo : addTodo}
          className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 mb-10"
        >
          <h2
            className={`text-xl font-semibold ${
              editingId ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            {editingId ? "Edit Todo" : "Add New Todo"}
          </h2>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo Title (Required)"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {/* Description Input */}
          <textarea
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (Optional)"
            className="border border-gray-300 p-3 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {/* Completed Checkbox (Edit mode) */}
          {editingId && (
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <input
                type="checkbox"
                id="completed-checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="completed-checkbox"
                className="text-gray-700 font-medium cursor-pointer"
              >
                Mark as Completed
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className={`flex-1 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition duration-200 cursor-pointer ${
                editingId
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-green-500 hover:bg-green-600"
              } focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-indigo-500`}
            >
              {editingId ? "Save Changes" : "Add Todo"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Todo List */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Tasks ({todos.length})
          </h2>
          <ul className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`flex justify-between items-center p-4 rounded-xl shadow-md transition duration-300 ${
                    todo.completed
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-white border-l-4 border-indigo-500 hover:shadow-lg"
                  }`}
                >
                  {/* Text Content - Clicking toggles completion */}
                  <div
                    className="flex-1 min-w-0 pr-4 cursor-pointer"
                    onClick={() => toggleComplete(todo._id, todo.completed)}
                  >
                    <span
                      className={`block text-lg font-bold ${
                        todo.completed
                          ? "line-through text-green-700"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                    {todo.description && (
                      <p
                        className={`text-sm mt-1 ${
                          todo.completed
                            ? "line-through text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(todo)}
                      className="p-2 rounded-full text-indigo-500 hover:bg-indigo-100 transition cursor-pointer"
                      title="Edit Todo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-100 transition cursor-pointer"
                      title="Delete Todo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500 p-8 border border-dashed rounded-xl bg-white">
                No tasks to display. Start by adding one!
              </p>
            )}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Todo;
