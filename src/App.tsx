import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskBoard from "./components/Task/TaskBoard";
import TaskDetail from "./components/Task/TaskDetail";
import TaskEdit from "./components/Task/TaskEdit";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import TaskForm from "./components/Task/TaskForm";
import NotFound from "./utils/NotFound"; // Imported NotFound component

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ErrorBoundary>
          <main>
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="/task/:id/edit" element={<TaskEdit />} />
              <Route path="*" element={<NotFound />} />{" "}
              {/* Route for 404 page */}
            </Routes>
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
