import React from "react";
import { FileProvider } from "./FileContext";
import { SubtaskProvider } from "./SubtaskContext";
import { TaskProvider } from "./TaskContext";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <FileProvider>
      <SubtaskProvider>
        <TaskProvider>{children}</TaskProvider>
      </SubtaskProvider>
    </FileProvider>
  );
};

export default AppContextProvider;
