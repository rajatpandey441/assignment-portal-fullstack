import React, { useReducer } from "react";
import { useLocalState } from "../util/useLocalState";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const value = { jwt, setJwt };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
