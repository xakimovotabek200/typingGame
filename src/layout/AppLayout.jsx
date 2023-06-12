import Footer from "@/Components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "next-themes";

const AppLayout = ({ children }) => {
  return (
    <div className=" bg-gray-50 container mx-auto">
      <ThemeProvider enableSystem={true} attribute="class">
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default AppLayout;
