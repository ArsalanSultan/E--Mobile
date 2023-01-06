import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useUserAuth } from "../Context/UserAuthContext";
const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  //   const { user } = useUserAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
