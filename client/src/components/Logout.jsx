import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.removeItem("jwttoken");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("username");
    navigate("/login", {
      state: {
        message: "Logout Successfully",
      },
    });
  }, []);
  return <div></div>;
}
