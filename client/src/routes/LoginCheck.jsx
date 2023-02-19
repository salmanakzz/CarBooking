import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyAuth } from "../api/verifyAuth";

export const LoginCheck = () => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);
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
  return auth && token ? navigate("/register-car") : <Outlet />;
};
