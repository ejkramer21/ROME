import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Element {...props} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
}

export default PrivateRoute;