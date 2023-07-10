import { HeaderMegaMenu } from "./components/Header";
import UiProvider from "./context/uiProvider";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);
  return (
    <UiProvider>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderMegaMenu />
        <Outlet />
      </div>
    </UiProvider>
  );
}

export default App;
