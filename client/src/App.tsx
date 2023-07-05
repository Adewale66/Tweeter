import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FooterSocial } from "./components/Footer";
import { HeaderMegaMenu } from "./components/Header";
import UiProvider from "./context/uiProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "./store";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return (
    <UiProvider>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <HeaderMegaMenu />
        <Outlet />
        <FooterSocial />
      </div>
    </UiProvider>
  );
}

export default App;
