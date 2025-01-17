import axios from "axios";

// Create a reusable Axios instance for API requests
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Your API base URL
  headers: {
    "Content-Type": "application/json", // Set the content type
  },
});

// Optionally, you can add interceptors to handle errors or authorization globally
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors globally
    console.error("API Error: ", error);
    return Promise.reject(error); // Propagate error
  }
);

export default apiClient;
