import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import LoginUI from "./components/LoginUI.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Blank from "./components/Blank.jsx";
import PrivateRoute from "../PrivateRoute";
import AddExpense from "./components/Expense/AddExpense";
import ExpenseList from "./components/Expense/ExpenseList";
import IncomeList from "./components/Income/IncomeList";
import AddIncome from "./components/Income/AddIncome";
import Logout from "./components/Logout";
import DashboardPage from "./components/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      // {
      //   path: "",
      //   element: <Blank />,
      // },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/expenses",
        element: <ExpenseList />,
      },
      {
        path: "/add-expenses",
        element: <AddExpense />,
      },
      {
        path: "/incomes",
        element: <IncomeList />,
      },
      {
        path: "/add-income",
        element: <AddIncome />,
      },
      {
        path: "/income",
        element: <Blank />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
