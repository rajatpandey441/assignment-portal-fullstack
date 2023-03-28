import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AssignmentView from "./components/AssignmentView/AssignmentView";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";
import { Login } from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./components/CodeReviewerDashboard/CodeReviewerDashboard";
import CodeReviewAssignmentView from "./components/CodeReviewAssignmentView/CodeReviewAssignmentView";
import { UserContext } from "./UserProvider/UserProvider";

function App() {
  const user = useContext(UserContext);
  const [roles, setRoles] = useState(getRoleFromJWT());
  useEffect(() => {
    setRoles(getRoleFromJWT());
  }, [user.jwt]);
  function getRoleFromJWT() {
    if (user && user.jwt) {
      const decoded = jwt_decode(user.jwt);
      return decoded.authorities;
    }
    return [];
  }
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role.authority === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role.authority === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
