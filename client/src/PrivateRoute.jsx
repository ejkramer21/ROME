import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './components/jsx/UserContext';

function PrivateRoute({ element: Component, ...rest }) {
  const { user } = UserContext();
  return (
    <Route {...rest} element={user ? <Component /> : <Navigate to="/login" />} />
  );
}

export default PrivateRoute;