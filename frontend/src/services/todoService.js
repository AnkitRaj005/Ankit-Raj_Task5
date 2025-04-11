import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

const todoService = {
  getAllTodos: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/todos`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  createTodo: async (title) => {
    try {
      const response = await axios.post(
        `${API_URL}/todos`,
        { title },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const response = await axios.put(
        `${API_URL}/todos/${id}`,
        updates,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`, getAuthHeader());
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },
};

export default todoService;
