import { FooterSocial } from "./components/Footer";
import { HeaderMegaMenu } from "./components/Header";
import UiProvider from "./context/uiProvider";
import { Outlet } from "react-router-dom";

function App() {
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
