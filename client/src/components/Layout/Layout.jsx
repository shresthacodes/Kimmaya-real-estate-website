import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDetailContext from "../Context/UserDetailContext";
import { createUser } from "../../utils/api";
import { useMutation } from "react-query";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenSilently, loginWithPopup } =
    useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        let token;
        try {
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "http://localhost:3000",
              scope: "openid profile email",
            },
          });
        } catch (e) {
          console.error("Silent token retrieval failed:", e);
          if (e.error === "login_required") {
            await loginWithPopup({
              authorizationParams: {
                audience: "http://localhost:3000",
                scope: "openid profile email",
              },
            });
            token = await getAccessTokenSilently();
          } else {
            throw e;
          }
        }
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token: token }));
        mutate(token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
