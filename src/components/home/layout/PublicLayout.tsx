import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      <div className="absolute left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default PublicLayout;