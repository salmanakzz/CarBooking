// admin context file

import { createContext, useState } from "react";

export const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <AdminContext.Provider value={{ auth, setAuth, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
};


