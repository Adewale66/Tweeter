import { FooterSocial } from "./components/Footer";
import { MemoizedHeaderMegaMenu } from "./components/Header";
import UiProvider from "./context/uiProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <UiProvider>
      <div className="layout">
        <MemoizedHeaderMegaMenu />
        <Outlet />
        <FooterSocial />
      </div>
    </UiProvider>
  );
}

export default App;
