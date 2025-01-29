import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskBoard from "./components/Task/TaskBoard";
import TaskDetail from "./components/Task/TaskDetail";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import NotFound from "./utils/NotFound";
import AppContextProvider from "./context/AppContextProvider";

const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
        <Footer />
      </AppContextProvider>
    </Router>
  );
};

export default App;
