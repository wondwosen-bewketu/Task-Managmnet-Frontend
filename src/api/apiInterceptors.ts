import apiClient from "./apiClient";

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error);
    return Promise.reject(error);
  }
);

export default apiClient;
