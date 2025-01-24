// apiInterceptors.ts
import apiClient from "./apiClient";

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
