import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signup from "./components/auth/signUp";
import Signin from "./components/auth/signIn";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteSignUp from "./components/ProtectedRouteSignUp";

import Account from "./components/account";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/register"
            element={
              <ProtectedRouteSignUp>
                <Signup />
              </ProtectedRouteSignUp>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteSignUp>
                <Signin />
              </ProtectedRouteSignUp>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
);
