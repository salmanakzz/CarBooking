import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddCarPage, AdminLoginPage, HomePage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/register-car" element={<AddCarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
