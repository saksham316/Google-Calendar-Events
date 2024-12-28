// -----------Imports------------
import { SignIn } from "../modules/auth/components";
import { AuthLayout, NotFound, UnAuthLayout } from "../shared/components";

// ------------------------------
// ------------------------------

export const Routes = () => {
  return {
    path: "/",
    element: <UnAuthLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
        path: "/",
      },
      {
        element: <NotFound />,
        path: "*",
      },
    ],
  };
};
