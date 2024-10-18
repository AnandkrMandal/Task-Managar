import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from './components/index.js'
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
     
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard/>
          </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthLayout authentication>
            <Account/>
          </AuthLayout>
        ),
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);