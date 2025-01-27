import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://task-managment-backend-0q1f.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
