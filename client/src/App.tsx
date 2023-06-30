import { useEffect } from "react";
import { FooterSocial } from "./components/Footer";
import { HeaderMegaMenu } from "./components/Header";
import UiProvider from "./context/uiProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return (
    <UiProvider>
      <div className="layout">
        <HeaderMegaMenu />
        <Outlet />
        <FooterSocial />
      </div>
    </UiProvider>
  );
}

export default App;
