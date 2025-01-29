import React from "react";
import { FileProvider } from "./FileContext";
import { SubtaskProvider } from "./SubtaskContext";
import { TaskProvider } from "./TaskContext";

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FileProvider>
      <SubtaskProvider>
        <TaskProvider>{children}</TaskProvider>
      </SubtaskProvider>
    </FileProvider>
  );
};

export default AppContextProvider;
