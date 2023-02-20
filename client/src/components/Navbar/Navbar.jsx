import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../store/AdminContext";

export const Navbar = ({ page }) => {
  const { setAuth, setToken } = React.useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    deleteCookie("token");
    setAuth(false);
    setToken(false);
    navigate("/admin");
  };
  return (
    <div className="flex justify-end">
      <div className="gap-4 justify-end flex fixed pr-[1.25rem] bg-[#f9f9f9] z-10 !w-[100%]">
        {page === "list" ? (
          <Button
            type="button"
            variant="text"
            size="small"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/register-car")}
          >
            Register Car
          </Button>
        ) : (
          <Button
            type="button"
            variant="text"
            size="small"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/car-list")}
          >
            Car list
          </Button>
        )}

        <Button
          type="button"
          variant="contained"
          size="small"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
