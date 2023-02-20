import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { AdminContextProvider } from "./store/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} className="mt-[3rem]">
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
