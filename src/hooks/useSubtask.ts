import { useState, useEffect } from "react";
import { SubTask, Status } from "../types";
import { addSubtask } from "../services";
import { toast } from "react-toastify";

export const useSubtask = (taskId: string, initialSubtask?: SubTask | null) => {
  const [title, setTitle] = useState<string>(initialSubtask?.title || "");
  const [description, setDescription] = useState<string>(
    initialSubtask?.description || ""
  );
  const [status, setStatus] = useState<Status>(
    initialSubtask?.status || Status.Pending
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialSubtask) {
      setTitle(initialSubtask.title);
      setDescription(initialSubtask.description);
      setStatus(initialSubtask.status);
    }
  }, [initialSubtask]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!taskId) {
      toast.error("Parent task ID is missing.");
      setLoading(false);
      return;
    }

    const newSubtask: SubTask = {
      title,
      description,
      status,
      parentTask: taskId,
    };

    try {
      const response = await addSubtask(newSubtask);
      if (response && response._id) {
        toast.success("Subtask successfully created!");
        window.location.reload(); // This will refresh the page
        return { ...newSubtask, _id: response._id };
      } else {
        toast.error("Failed to create subtask. Please try again.");
      }
    } catch {
      toast.error("Failed to create subtask. Please try again.");
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > // Updated to include HTMLSelectElement
  ) => {
    const { id, value } = e.target;
    if (id === "title") setTitle(value);
    if (id === "description") setDescription(value);
    if (id === "status") setStatus(value as Status);
  };

  return {
    title,
    description,
    status,
    loading,
    setTitle,
    setDescription,
    setStatus,
    handleSubmit,
    handleChange,
  };
};
