import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyAuth } from "../api/verifyAuth";
import { AdminContext } from "../store/AdminContext";

export const PrivateRoute = () => {
  const { auth, setAuth, token, setToken } = useContext(AdminContext);
  console.log(auth, token);
  const navigate = useNavigate();

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const Token = getCookie("token");

    if (Token) {
      verifyAuth(Token).then((res) => {
        const { status, admin, auth } = res;
        if (status === "ok" && admin && auth) {
          setToken(true);
          setAuth(true);
        } else {
          setAuth(true);
        }
      });
    } else {
      setAuth(true);
    }
  }, []);
  return auth && token ? <Outlet /> : navigate("/admin");
};
