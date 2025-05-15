import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="relative flex justify-center items-center flex-grow p-4 bg-[#020103] overflow-hidden">
        {/* Blurred radial gradient layer */}
        <div
          className="absolute w-screen h-screen rounded-full blur-3xl opacity-50 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, #602A9A 0%, transparent 100%)",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -20%)",
          }}
        ></div>
        <div
          className="absolute w-1/2 h-1/2 rounded-full blur-3xl opacity-100 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, #602A9A 0%, transparent 60%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -30%)",
          }}
        ></div>

        {/* Main content */}
        <div className="relative z-10 w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
