import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { showSystemAlert } from "../../app/alertServices";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.loginDMS);

  if (!isLoggedIn) {
    showSystemAlert("Please log into the system", "warning");
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
