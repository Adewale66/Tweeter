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
import Home from "./pages/Home/Home.tsx";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext.tsx";
import Demo from "./context/Scroll.tsx";
import UiProvider from "./context/uiProvider.tsx";
import { AuthenticationForm } from "./components/Form.tsx";
import { NotFoundTitle } from "./pages/Error.tsx";
import Profile from "./pages/Profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundTitle />,
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
      {
        path: "/:profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UiProvider>
        <AuthenticationForm />
      </UiProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <Demo />
      <RouterProvider router={router} />
      <BrowserRouter />
      <AuthContext />
    </React.StrictMode>
  </Provider>
);
