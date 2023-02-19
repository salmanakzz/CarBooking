import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddCarPage, AdminLoginPage, HomePage } from "./pages";
import { LoginCheck } from "./routes/LoginCheck";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<LoginCheck />}>
          <Route path="/admin" element={<AdminLoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/register-car" element={<AddCarPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
