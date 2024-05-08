import React, { Component } from "react";
import { useSelector } from "react-redux";
// Outlet => is a component that shows the chilren
import { Outlet, Navigate } from "react-router-dom";

export default function LoggedUser() {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user is logged in
  if (!currentUser.username) {
    // If not logged in, navigate to the register page
    return <Navigate to="/register" />;
  }

  // If logged in, render the child routes
  return <Outlet />;
}
