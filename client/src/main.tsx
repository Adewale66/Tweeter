import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import Bookmarks from "./pages/Bookmarks.tsx";
import Explore from "./pages/Explore.tsx";
import MobileLogin from "./pages/MobileLogin.tsx";
import Home from "./pages/Home.tsx";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
  {
    path: "/login",
    element: <MobileLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <AuthContext />
      <RouterProvider router={router} />
      <BrowserRouter />
    </React.StrictMode>
  </Provider>
);
