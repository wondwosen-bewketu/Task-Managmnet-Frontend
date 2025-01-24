import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskBoard from "./components/Task/TaskBoard";
import TaskDetail from "./components/Task/TaskDetail";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import NotFound from "./utils/NotFound"; // Imported NotFound component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="*" element={<NotFound />} />{" "}
              {/* Route for 404 page */}
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
