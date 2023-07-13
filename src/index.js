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

import Account from "./components/Account";
import NewProtocol from "./pages/NewProtocol";
import Protocol from "./pages/Protocol";
import NewPage from "./pages/NewPage";
import { ThemeProvider } from "@material-tailwind/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
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
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewProtocol />
              </ProtectedRoute>
            }
          />
          <Route path="/teste" element={<NewPage />} />
          <Route path="/protocol/:id" element={<Protocol />} />
        </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);
