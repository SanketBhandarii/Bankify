import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/signup/SignUp.jsx";
import Login from "./components/login/Login.jsx";
import BankAccountForm from "./components/bankacct/BankAccount.jsx";
import BankAccountsList from "./components/acctlists/BankAccountList.jsx";
import AllAccounts from "./components/bankacct/AllAccounts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/createAccount",
        element: <BankAccountForm />,
      },
      {
        path: "/",
        element: <BankAccountsList />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <AllAccounts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
