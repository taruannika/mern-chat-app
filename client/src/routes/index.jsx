import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import AuthLayouts from "../layouts";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: (
          <AuthLayouts>
            <RegisterPage />
          </AuthLayouts>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayouts>
            <LoginPage />
          </AuthLayouts>
        ),
      },
    ],
  },
]);

export default router;
