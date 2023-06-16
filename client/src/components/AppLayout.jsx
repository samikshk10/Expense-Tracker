import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./common/Navbar";
import { useEffect } from "react";

const AppLayout = () => {
  const token = localStorage.getItem("jwttoken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
