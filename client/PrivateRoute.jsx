import React, { useEffect, useRef, useState } from "react";
import AppLayout from "./src/components/AppLayout";
import { Navigate, useNavigate } from "react-router-dom";
import baseurl from "./config";
import App from "./src/App";
export default function PrivateRoute() {
  const token = localStorage.getItem("jwttoken");
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const check = () => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    check();
  }, []);

  // const isLoggedIn = useRef(true);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${baseurl}/handlemiddleware`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log("response>>>>>" + data.isLoggedIn);
  //     if (data.isLoggedIn === true) {
  //       navigate("/");
  //     } else {
  //       navigate("/login");
  //     }

  //     //data set login to true if authenticated
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchData();

  return (
    <div>
      <AppLayout />
    </div>
  );
}
