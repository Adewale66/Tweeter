import UiProvider from "./context/uiProvider.tsx";
import { AuthenticationForm } from "./components/Form.tsx";
import { NotFoundTitle } from "./pages/Error.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Bookmarks from "./pages/Bookmarks.tsx";
import Home from "./pages/Home/Home.tsx";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";

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
        path: "/:profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <NotFoundTitle />,
    element: (
      <UiProvider>
        <AuthenticationForm />
      </UiProvider>
    ),
  },
]);

export default router;
