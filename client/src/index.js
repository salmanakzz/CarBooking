import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdminContextProvider } from "./store/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </React.StrictMode>
);
