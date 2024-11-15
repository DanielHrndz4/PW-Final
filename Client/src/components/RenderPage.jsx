import React from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer";

const RenderPage = ({ component }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900">
        <Navbar />
      </header>
      <main className="flex-grow">
        {component}
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default RenderPage;
