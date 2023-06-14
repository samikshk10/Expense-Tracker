import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
