import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import fetchService from "../../services/fetchService";
import { UserContext } from "../../UserProvider/UserProvider";
const PrivateRoute = ({ children }) => {
  const user = useContext(UserContext);
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  if (user.jwt) {
    fetchService(
      `/api/v1/auth/validate?token=${user.jwt}`,
      "GET",
      user.jwt
    ).then((isTokenValid) => {
      setIsLoading(false);
      setIsValid(isTokenValid);
    });
  } else {
    return <Navigate to="/login" />;
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
