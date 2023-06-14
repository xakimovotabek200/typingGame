import Footer from "@/Components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className=" bg-gray-50 container mx-auto"> 
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
