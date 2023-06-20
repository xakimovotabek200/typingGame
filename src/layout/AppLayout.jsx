import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/navbar/Navbar";
import React from "react";

function AppLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default AppLayout;
