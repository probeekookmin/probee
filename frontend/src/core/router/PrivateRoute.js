// // PrivateRoute.js
// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// function PrivateRoute({ element: Element, ...rest }) {
//   const isAuthenticated = !!localStorage.getItem("jwtToken");
//   return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
// }

// export default PrivateRoute;
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem("jwtToken");
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
