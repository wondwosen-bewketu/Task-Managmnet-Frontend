// src/pages/HomePage.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskList from "../components/Task/TaskList";

const HomePage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col text-textDark">
      <Header />
      <main className="flex-1">
        {/* Task List Section */}
        <section className="container mx-auto my-12 px-6">
          <h2 className="text-4xl font-bold text-primary text-center mb-8">
            Welcome to Task Manager Pro
          </h2>
          <TaskList />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
