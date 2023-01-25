import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/auth";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AuthRoute() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default AuthRoute;
