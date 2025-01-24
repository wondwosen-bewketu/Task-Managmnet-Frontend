export const getStatusStyle = (status: string): string => {
  switch (status) {
    case "completed":
      return "bg-green-200 text-green-800";
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "inprogress":
      return "bg-blue-200 text-blue-800";
    case "cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export const getPriorityStyle = (priority: string): string => {
  switch (priority) {
    case "low":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "high":
      return "text-orange-600";
    case "urgent":
      return "text-red-600";
    case "critical":
      return "text-purple-600 font-bold";
    default:
      return "text-gray-600";
  }
};

export const formatStatus = (status: string): string =>
  status.charAt(0).toUpperCase() + status.slice(1);

export const formatPriority = (priority: string): string =>
  priority.charAt(0).toUpperCase() + priority.slice(1);
