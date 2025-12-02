import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <div>Loading...</div>;
  if (user) return children;
  return (
    <Navigate
      state={{
        from: location.pathname,
        message: "You need to login first to access this page!",
      }}
      to="/login"
    ></Navigate>
  );
};

export default PrivateRoute;
