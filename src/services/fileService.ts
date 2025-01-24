import apiClient from "../api/apiClient"; // Import the configured Axios client

// Upload a file
export const uploadFile = async (
  file: File,
  taskId: string
): Promise<{ id: string; url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/files/upload?taskId=${taskId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Could not upload file");
  }
};

// Delete a file
export const deleteFile = async (fileId: string): Promise<void> => {
  try {
    await apiClient.delete(`/files/${fileId}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Could not delete file");
  }
};
