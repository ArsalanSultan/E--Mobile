import React from "react";
import { Route, Redirect } from "react-router-dom";

let isAuthenticated;
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  (isAuthenticated = localStorage.getItem("accessToken")),
  (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/unauth/login" }} />
        )
      }
    />
  )
);

export default AdminProtectedRoute;
