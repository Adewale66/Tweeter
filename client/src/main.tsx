import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import WindowScroll from "./context/Scroll.tsx";
import router from "./routes.tsx";
import AuthContext from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <WindowScroll />
      <RouterProvider router={router} />
      <BrowserRouter />
      <AuthContext />
    </React.StrictMode>
  </Provider>
);
